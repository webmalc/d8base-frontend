import {isPlatformServer} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorHandler, Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import * as Sentry from '@sentry/angular';
import {environment} from '../../../environments/environment';

const ERROR_TOAST_DURATION_MS = 3000;

@Injectable({
    providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

    constructor(public toaster: ToastController,
                private readonly router: Router,
                @Inject(PLATFORM_ID)private readonly platformId: object
    ) {
    }

    public handleError(error: any): void {
        if (environment.sentry.enabled) {
            Sentry.captureException(error);
        }

        if (error instanceof HttpErrorResponse && (401 === error.status || 'invalid_grant' === error.message)) {
            this.showMessage('authentication expired');
            this.router.navigateByUrl('/auth/login');

            return;
        }

        if (5 === Math.floor(error.status / 100)) {
            this.showMessage('server error');

            return;
        }

        this.showMessage('unexpected error');
        throw error;
    }

    private showMessage(message: string, duration: number = ERROR_TOAST_DURATION_MS): void {
        if (isPlatformServer(this.platformId)) {
            console.error(message);
        } else {
            this.toaster.create({message, duration}).then(
                toast => toast.present()
            );
        }
    }
}
