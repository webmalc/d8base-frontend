import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP_UNAUTHORIZED } from '@app/core/constants/http.constants';
import { AuthenticationService } from '@app/core/services';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, share, switchMap } from 'rxjs/operators';

/**
 *  Tries to refresh auth token if it has expired
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refresh$: Observable<void> | null = null;

  constructor(
    private readonly authenticator: AuthenticationService,
  ) {
  }

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
    forceRefresh?: boolean,
  ): Observable<HttpEvent<any>> {
    const handleRequestErrors = () =>
      next.handle(request).pipe(
        catchError(error =>
          this.authenticator.isAuthenticated$.pipe(
            switchMap(isAuthenticated =>
              (
                error.status === HTTP_UNAUTHORIZED &&
                isAuthenticated &&
                !forceRefresh
              ) ? this.intercept(request, next, true)
                : throwError(error),
            ),
          ),
        ),
      );


    if ((forceRefresh) && !this.refresh$) {
      this.refresh$ = this.authenticator.refresh().pipe(
        finalize(() => (this.refresh$ = null)),
        share(),
      );
    }

    return !this.refresh$ || request.url.endsWith(environment.backend.refresh)
      ? handleRequestErrors()
      : this.refresh$.pipe(
        switchMap(() => handleRequestErrors()),
      );
  }
}
