import { isPlatformServer } from '@angular/common';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import * as HttpCodes from '@app/core/constants/http.constants';
import { Predicate } from '@app/core/types/common-types';
import { environment } from '@env/environment';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as ErrorMessages from './error-messages';

const ERROR_TOAST_DURATION_MS = 3000;

const filters: Predicate<HttpErrorResponse>[] = [
  (response) => !response.url?.startsWith(environment.backend.url),
  (response) => response.status === HttpCodes.HTTP_NOT_FOUND,
];

function isFiltered(response: HttpErrorResponse): boolean {
  return filters.some(f => f(response));
}

/**
 * Shows error messages from server
 */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private readonly toaster: ToastController,
    private readonly router: Router,
    private readonly translate: TranslateService,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {
  }

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        this.handleHttpErrorResponse(httpErrorResponse);
        return throwError(httpErrorResponse);
      }),
    ) as Observable<HttpEvent<any>>;
  }

  private handleHttpErrorResponse(response: HttpErrorResponse): void {
    if (isFiltered(response)) {
      return;
    }

    if (
      HttpCodes.HTTP_UNAUTHORIZED === response.status ||
      (HttpCodes.HTTP_BAD_REQUEST === response.status && 'invalid_grant' === response.error?.error)
    ) {
      this.handleUnauthorizedResponse();
      return;
    }

    if (HttpCodes.HTTP_BAD_REQUEST === response.status) {
      this.handleBadRequestResponse(response);
      return;
    }

    this.handleServerErrorResponse();
  }

  private handleBadRequestResponse(response: HttpErrorResponse): void {
    const error = response.error;
    const all = error.error?.__all__ || error.__all__;
    const messages: string[] = Array.isArray(all)
      ? all : Array.isArray(error.password) ? error.password
      : error.error_description ? [error.error_description] : Object.entries(error).map(e => `${e[0]}: ${e[1]}`);
    if (messages.length > 0) {
      messages.forEach(message => this.showMessage(message));
    } else {
      this.showMessage(response.message);
    }
  }

  private handleUnauthorizedResponse(): void {
    this.showMessage(this.translate.instant(ErrorMessages.AUTHENTICATION_ERROR));
    this.router.navigateByUrl('/auth/login');
  }

  private handleServerErrorResponse(): void {
    this.showMessage(this.translate.instant(ErrorMessages.GENERIC_SERVER_ERROR));
  }

  private showMessage(message: string, duration: number = ERROR_TOAST_DURATION_MS): void {
    if (isPlatformServer(this.platformId)) {
      console.error(message);
    } else {
      this.toaster.create({ message, duration }).then(
        toast => toast.present(),
      );
    }
  }
}
