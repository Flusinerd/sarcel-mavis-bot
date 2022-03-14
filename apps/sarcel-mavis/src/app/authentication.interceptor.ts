import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, switchMap, take, throwError } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { filter } from 'rxjs/operators';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  private _isRefreshing = false;
  private _refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authReq = request;
    const token = this.authService.accessToken;
    if (token) {
      authReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token)
      });
    }

    return next.handle(authReq).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && !authReq.url.includes('/api/discord/auth') && error.status === 401) {
          console.log('401 error');
          return this.handle401Error(request, next);
        }
        console.log('error', error);
        return throwError(error);
      })
    )
  }

  /**
   * Handle 401 error
   * @param request HttpRequest
   * @param next HttpHandler
   * @private
   */
  private handle401Error(request: HttpRequest<unknown>, next: HttpHandler) {
    // If we are not refreshing already, and refresh token is present, then refresh
    if (!this._isRefreshing && this.authService.refreshToken) {
      this._isRefreshing = true;
      return this.authService.refreshToken().pipe(
        switchMap((response) => {
          this._isRefreshing = false;
          return next.handle(
            request.clone({
              headers: request.headers.set('Authorization', 'Bearer ' + response.access_token)
            })
          );
        }),
        catchError(error => {
          this._isRefreshing = false;
          this.authService.logout();
          return throwError(error)
        })
      )
    }

    // Wait for the refresh to complete, then return the original request
    return this._refreshTokenSubject.pipe(
      filter(token => token != null),
      take(1),
      switchMap(token => {
        return next.handle(
          request.clone({
            headers: request.headers.set('Authorization', 'Bearer ' + token)
          })
        );
      })
    );
  }
}

export const AuthenticationInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthenticationInterceptor,
  multi: true
};
