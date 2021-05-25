import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponseInterface } from '@app/auth/interfaces/auth-response.interface';
import { HTTP_UNAUTHORIZED } from '@app/core/constants/http.constants';
import * as CurrentUserActions from '@app/store/current-user/current-user.actions';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { environment } from '@env/environment';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { concat, Observable, throwError } from 'rxjs';
import {
  catchError,
  distinct,
  filter,
  finalize,
  first,
  ignoreElements,
  share,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

/**
 *  Tries to refresh auth token if it has expired
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  @Select(CurrentUserSelectors.tokens)
  public readonly tokens$: Observable<AuthResponseInterface>;

  private refresh$: Observable<never>;

  public intercept(request: HttpRequest<any>, next: HttpHandler, forceRefresh?: boolean): Observable<HttpEvent<any>> {
    const handleRequestErrors = () =>
      next.handle(request).pipe(
        catchError(error =>
          this.tokens$.pipe(
            first(),
            switchMap(tokens =>
              error.status === HTTP_UNAUTHORIZED && tokens?.access_token && !forceRefresh
                ? this.intercept(request, next, true)
                : throwError(error),
            ),
          ),
        ),
      );

    if (forceRefresh && !this.refresh$) {
      this.refresh$ = this.refresh().pipe(
        finalize(() => (this.refresh$ = null)),
        share(),
      );
    }

    return !this.refresh$ || request.url.endsWith(environment.backend.refresh)
      ? handleRequestErrors()
      : concat(this.refresh$, handleRequestErrors());
  }

  /**
   * Calls the RefreshTokens action
   * Returns a new Observable, which completes when tokens$ change
   */
  private refresh(): Observable<never> {
    let firstRun = true;
    return this.tokens$.pipe(
      filter(x => !!x),
      distinct(),
      take(2),
      tap(() => {
        if (firstRun) {
          firstRun = false;
          this.refreshTokens();
        }
      }),
      ignoreElements(),
    );
  }

  @Dispatch()
  private refreshTokens(): CurrentUserActions.RefreshTokens {
    return new CurrentUserActions.RefreshTokens();
  }
}
