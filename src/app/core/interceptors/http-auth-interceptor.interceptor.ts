import {Injectable, Provider} from '@angular/core';
import {
  HTTP_INTERCEPTORS, HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandler, HttpHeaders,
  HttpInterceptor, HttpParams,
  HttpRequest
} from '@angular/common/http';
import {BehaviorSubject, EMPTY, Observable, OperatorFunction, throwError} from 'rxjs';
import {catchError, filter, first, switchMap, tap} from 'rxjs/operators';
import {CurrentUserService} from '../auth/currentuser-service.service';



export interface Tokens {
  accessToken?: string | null;
  refreshToken?: string | null;
}

@Injectable()
export class HttpAuthInterceptorInterceptor implements HttpInterceptor {
  private tokens$ = new BehaviorSubject<Tokens | undefined | null>(undefined);

  constructor(private currentUserService: CurrentUserService) {
    this.currentUserService.auth$.subscribe((auth) => {
      this.tokens$.next(auth == undefined ? {} : auth);
    });
  }

  // tslint:disable-next-line:no-any
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.waitTokensAndDoRequest(req, next).pipe(
      catchError(error => {
        if (!(error instanceof HttpErrorResponse && error.status === 401)) {
          return throwError(error);
        }

        const tokens = this.tokens$.value;
        if (tokens == undefined) { // if suspended
          return this.waitTokensAndDoRequest(req, next).pipe(catchError(this.handlePostRefreshRequest));
        }

        if (tokens.refreshToken == undefined) {
          return throwError(Error('unauthorized')); // TODO: throw concreate error and navigate to login in handler
        }

        // suspend future requests
        this.tokens$.next(undefined);
        return this.currentUserService.refreshTokens(tokens.refreshToken)
        .pipe(
          switchMap(() => this.waitTokensAndDoRequest(req, next)),
          catchError(this.handlePostRefreshRequest)
        );
      })
    );
  }

// tslint:disable-next-line:no-any
  private waitTokensAndDoRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/refresh')) {
      return next.handle(req);
    }
    return this.tokens$.pipe(
      filter(auth => auth != undefined) as OperatorFunction<Tokens | undefined | null, Tokens>,
      first(),
      switchMap((tokens: Tokens) => {
        if (tokens.accessToken == undefined) {
          return next.handle(req);
        }
        const authReq = req.clone({
          headers: new HttpHeaders({
            Authorization: `Bearer ${tokens.accessToken}`, 'Content-Type': 'application/json'
          })
        });
        return next.handle(authReq);
      })
    );
  }

  private handlePostRefreshRequest = (error: Error) => {
    if (!(error instanceof HttpErrorResponse && error.status === 401)) {
      return throwError(error);
    }

    return throwError(Error('unauthorized after refresh')); // TODO: throw concreate error
  };
}

export function authInterceptorFactory(currentUserService: CurrentUserService) {
  return new HttpAuthInterceptorInterceptor(currentUserService);
}

export const HTTP_AUTH_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useFactory: authInterceptorFactory,
  multi: true,
  deps: [CurrentUserService]
};
