import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as HttpCodes from '@app/core/constants/http.constants';
import { getHttpErrorMessages } from '@app/core/functions/http.functions';
import { AuthenticationService, ToastService } from '@app/core/services';
import { Predicate } from '@app/core/types/common-types';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as ErrorMessages from './error-messages';

const filters: Predicate<HttpErrorResponse>[] = [
  response => !response.url?.startsWith(environment.backend.url),
  response => response.status === HttpCodes.HTTP_NOT_FOUND,
  response => HttpCodes.HTTP_BAD_REQUEST === response.status && 'invalid_grant' === response.error?.error,
  response =>
    response.status === HttpCodes.HTTP_BAD_REQUEST && response.url.includes(environment.backend.messages_list),
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
    private readonly toast: ToastService,
    private readonly router: Router,
    private readonly auth: AuthenticationService,
  ) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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

    if (HttpCodes.HTTP_UNAUTHORIZED === response.status) {
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
    const messages = getHttpErrorMessages(response);
    if (messages.length > 0) {
      messages.forEach(message => this.toast.showError(message));
    } else {
      this.toast.showError(response.message);
    }
  }

  private handleUnauthorizedResponse(): void {
    this.toast.showError(ErrorMessages.AUTHENTICATION_ERROR, { translate: true });
    this.auth.logout(); // delete invalid credentials
    this.router.navigateByUrl('/auth/login');
  }

  private handleServerErrorResponse(): void {
    this.toast.showError(ErrorMessages.GENERIC_SERVER_ERROR, { translate: true });
  }
}
