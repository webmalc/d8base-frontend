import {ErrorHandler, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ErrorList} from '@app/core/enums/error-list';
import {environment} from '@env/environment';
import * as Sentry from '@sentry/angular';
import * as ErrorMessages from './error-messages';

function isTokenError(error: Error): boolean {
    return error?.message === ErrorList.EMPTY_TOKEN_ERROR ||
        error?.message === ErrorList.REFRESH_TOKEN_EXPIRED_ERROR;
}

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private readonly router: Router) {
    }

    public handleError(error: Error): void {
        if (environment.sentry.enabled) {
            Sentry.captureException(error);
        }

        if (isTokenError(error)) {
            console.error(ErrorMessages.AUTHENTICATION_ERROR);
            this.router.navigateByUrl('/auth/login');

            return;
        }

        console.error(ErrorMessages.UNKNOWN_ERROR);
        throw error;
    }
}
