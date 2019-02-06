import { Injectable } from '@angular/core';
import {  HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            return next.handle(req).pipe(
                catchError(error => {
                    if (error instanceof HttpErrorResponse) {
                        const applicationError = error.headers.get('Application-Error');
                        if (applicationError) {
                            console.error(applicationError);
                            return throwError(applicationError);
                        }
                        const  serverError = error.error ;
                        let modelStateError = '';
                        if (serverError.errors && typeof serverError.errors === 'object') {
                            for (const key in serverError.errors) {
                                if (serverError.errors[key]) {
                                    modelStateError += serverError.errors[key] + '\n';
                                }
                            }
                        }
                        return throwError(modelStateError || error.message || serverError ||  'Server Error');
                    }

                })
            );
    }
}
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS ,
    useClass: ErrorInterceptor ,
    multi: true
};
