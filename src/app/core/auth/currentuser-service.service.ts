import {APP_INITIALIZER, Injectable, Provider} from '@angular/core';
import {Observable, of, OperatorFunction, ReplaySubject, throwError} from 'rxjs';
import {delay, filter, first, map, shareReplay, skip, switchMap, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';

interface RawAuthInfo {
  authToken: string;
  refreshToken: string;
}

interface DecodedAccessToken {
  authorities: string[];
  sub: string;
  role: string;
  id: string;
}

export interface UserAuthInfo {
  login: string;
  role: string;
  id: string;
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  private readonly _auth$ = new ReplaySubject<RawAuthInfo | undefined | null>(1);

  public readonly auth$: Observable<UserAuthInfo | undefined | null> = this._auth$.pipe(
    map(auth => {
        if (auth == undefined) {
          return undefined;
        }
        const accessToken = jwt_decode(auth.authToken) as DecodedAccessToken;
        return {
          login: accessToken.sub,
          role: accessToken.role,
          id: accessToken.id,
          accessToken: auth.authToken,
          refreshToken: auth.refreshToken
        };
      }
    ),
    shareReplay(1)
  );

  constructor(private httpClient: HttpClient) {
    const currentAuthJson = localStorage.getItem('auth');
    const currentAuth = currentAuthJson !== null ? JSON.parse(currentAuthJson) as RawAuthInfo : undefined;
    this._auth$.next(currentAuth);

    this._auth$.pipe(skip(1)).subscribe(auth => {
      if (auth == undefined) {
        localStorage.removeItem('auth');
      } else {
        localStorage.setItem('auth', JSON.stringify(auth));
      }
    });
  }

  authenticate(login: string, password: string): Observable<UserAuthInfo> {
    const options = {
      headers: new HttpHeaders({
        Authorization: `Basic ${btoa('main-client:secret')}`
      })
    };
    return this.httpClient.post<RawAuthInfo>('http://localhost:8080/login', JSON.stringify({login: login, password: password}), options).pipe(
      tap(auth => {
        this._auth$.next(auth);
      }),
      switchMap(() => this.auth$.pipe(filter(auth => auth != undefined), first()))
    ) as Observable<UserAuthInfo>;
  }

  logout() {
    this._auth$.next(undefined);
  }

  refreshTokens(refreshToken: string): Observable<RawAuthInfo> {
    return this.auth$.pipe(
      first(),
      switchMap(auth => {
        if (auth == undefined) {
          return throwError(Error('can not refresh without tokens'));
        }
        const options = {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + refreshToken
          })
        };
        return this.httpClient.post<RawAuthInfo>('http://localhost:8080/refresh', null, options)
        .pipe(tap(refreshed => {
          this._auth$.next(refreshed);
        }));
      })
    );
  }
}

export function authInitializer(
  currentUserService: CurrentUserService
): () => Promise<UserAuthInfo | undefined | null> {
  return () => currentUserService.auth$.pipe(first()).toPromise();
}

export const AUTH_INITIALIZER: Provider = {
  provide: APP_INITIALIZER,
  useFactory: authInitializer,
  deps: [CurrentUserService],
  multi: true
};
