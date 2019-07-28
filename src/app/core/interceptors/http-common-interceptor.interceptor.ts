import {Injectable, Provider} from '@angular/core';
import {
  HTTP_INTERCEPTORS, HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandler, HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {EMPTY, Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class HttpCommonInterceptor implements HttpInterceptor {

  constructor() {
  }

  // tslint:disable-next-line:no-any
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // tslint:disable-next-line:no-console
    console.info('request to', req.url, req.body);

    let modified;

    const idToken = localStorage.getItem('token');
    console.log(idToken);


    modified = req.clone({
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });

    console.log(req.method);
    const cloned = modified.clone({
      headers: modified.headers.set('Authorization',
        'Bearer ' + idToken)
    });

    console.log(cloned.headers);
    console.log(cloned.body);

    return next.handle(cloned).pipe(
      tap(res => {
        if (res.type === HttpEventType.Response) {
          // tslint:disable-next-line:no-console
          console.info('response from', res.url, res.body);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          alert('Не найдено');
          return EMPTY;
        }
        if (error.status === 500) {
          alert('Ошибка сервера');
          return EMPTY;
        }
        return throwError(error);
      })
    );
  }

}

export const HTTP_COMMON_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpCommonInterceptor,
  multi: true
};
