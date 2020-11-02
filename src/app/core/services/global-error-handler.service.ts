import {isPlatformServer} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorHandler, Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Router} from '@angular/router';
import {ErrorList} from '@app/core/enums/error-list';
import {AuthenticationService} from '@app/core/services/authentication.service';
import {environment} from '@env/environment';
import {ToastController} from '@ionic/angular';
import * as Sentry from '@sentry/angular';


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
        if (error.message === ErrorList.EMPTY_REFRESH_TOKEN_ERROR) {
            this.showMessage('authentication expired');
            this.router.navigateByUrl('/auth/login');

            throw error;
        }

        if (environment.sentry.enabled) {
            Sentry.captureException(error);
        }

        if (error instanceof HttpErrorResponse && (401 === error.status || 'invalid_grant' === error.message)) {
            if (error.url.endsWith(environment.backend.refresh)) {
                this.showMessage('authentication expired');
                this.router.navigateByUrl('/auth/login');
            }
        }

        if (error instanceof HttpErrorResponse && (5 === Math.floor(error.status / 100))) {
            this.showMessage('server error');

            return;
        }

        this.showMessage('unexpected error');
        throw error;
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
