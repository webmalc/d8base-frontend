import { ErrorHandler, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import * as Sentry from '@sentry/angular';
import * as ErrorMessages from './error-messages';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  public handleError(error: Error): void {
    if (environment.sentry.enabled) {
      Sentry.captureException(error);
    }

    console.error(ErrorMessages.UNKNOWN_ERROR);
    throw error;
  }
}
