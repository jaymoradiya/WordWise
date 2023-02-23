import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
  HttpHeaderResponse,
  HttpEventType,
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { CONFIG } from 'src/config/config';

@Injectable()
export class LoggingInterceptorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let newRequest = request.clone({
      url: CONFIG.API.BASE_URL + request.url,
      params: request.params.append('key', CONFIG.API.KEY),
    });
    console.log(`${newRequest.method} --> ${request.url}`);
    return next.handle(newRequest).pipe(
      tap(res => {
        if (res.type === HttpEventType.Response && res instanceof HttpResponse){
          console.log(`RES[${res.status}] <-- ${JSON.stringify(res.body,null,'\t')}`);
        }
      }),
      catchError((resError: HttpErrorResponse) => {
        console.log(`ERROR[${resError.status}] <-- ${JSON.stringify(resError.error,null,'\t')}`);
        const error:{message: string, code:number} ={
          message: "Unknown error occurred!",
          code: resError.status,
        };

        switch (resError.error.error.message) {
          case 'EMAIL_NOT_FOUND':
            error.message = "user with this email doesn't exist.";
            break;
          case 'INVALID_PASSWORD':
            error.message = "incorrect password.";
            break;
          case 'EMAIL_EXISTS':
            error.message = "user with this email already exist.";
            break;
          case 'OPERATION_NOT_ALLOWED':
            error.message = "you are not allowed to signup.";
            break;
          case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            error.message = "too many attempts, try again later!";
            break;          
        }
        return throwError(() => new Error(error.message,{cause: error.code}));
      }),
     
    );
  }
}
