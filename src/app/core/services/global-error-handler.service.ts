import {isPlatformServer} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorHandler, Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Router} from '@angular/router';
import {ErrorList} from '@app/core/enums/error-list';
import {environment} from '@env/environment';
import {ToastController} from '@ionic/angular';
import * as Sentry from '@sentry/angular';

const AUTHENTICATION_ERROR = 'authentication expired';
const GENERIC_SERVER_ERROR = 'server error';
const UNKNOWN_ERROR = 'unexpected error';

@Injectable({
    providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

    private readonly ERROR_TOAST_DURATION_MS = 3000;

    constructor(private readonly toaster: ToastController,
                private readonly router: Router,
                @Inject(PLATFORM_ID) private readonly platformId: object
    ) {
    }

    public handleError(error: Error): void {
        if (error?.message === ErrorList.EMPTY_TOKEN_ERROR ||
            error?.message === ErrorList.REFRESH_TOKEN_EXPIRED_ERROR
        ) {
            this.showMessage(AUTHENTICATION_ERROR);
            this.router.navigateByUrl('/auth/login');

            return;
        }

        if (environment.sentry.enabled) {
            Sentry.captureException(error);
        }

        if (error instanceof HttpErrorResponse) {
            this.showHttpError(error);

            return;
        }

        this.showMessage(UNKNOWN_ERROR);
        throw error;
    }

    private showHttpError(error: HttpErrorResponse): void {
        if (400 === error.status) {
            const messages: string[] = Array.isArray(error.error?.__all__)
                ? error.error.__all__
                : Object.entries(error.error).map(e => `${e[0]}: ${e[1]}`);
            if (messages.length > 0) {
                messages.forEach(message => this.showMessage(message));
            } else {
                this.showMessage(error.message);
            }
        }

        if (401 === error.status || 'invalid_grant' === error.message) {
            if (error.url.endsWith(environment.backend.refresh)) {
                this.showMessage(AUTHENTICATION_ERROR);
                this.router.navigateByUrl('/auth/login');
            }
        }

        if (5 === Math.floor(error.status / 100)) {
            this.showMessage(GENERIC_SERVER_ERROR);

            return;
        }

        this.showMessage(error.message || UNKNOWN_ERROR);
    }

    private showMessage(message: string, duration: number = this.ERROR_TOAST_DURATION_MS): void {
        if (isPlatformServer(this.platformId)) {
            console.error(message);
        } else {
            this.toaster.create({message, duration}).then(
                toast => toast.present()
            );
        }
    }
}
