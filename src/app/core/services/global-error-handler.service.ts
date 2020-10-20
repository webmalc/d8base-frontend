import {HttpErrorResponse} from '@angular/common/http';
import {ErrorHandler, Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Router} from '@angular/router';
import {Platform, ToastController} from '@ionic/angular';

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

    private showMessage(message: string, duration: number = 3000): void {
        if (this.platformId.toString() === 'server') {
            console.log(message);
        } else {
            this.toaster.create({message, duration}).then(
                toast => toast.present()
            );
        }
    }
}
