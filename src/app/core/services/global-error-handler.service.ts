import {HttpErrorResponse} from '@angular/common/http';
import {ErrorHandler, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

    constructor(public toaster: ToastController, private router: Router) {
    }

    public handleError(error: any): void {

        if (error instanceof HttpErrorResponse && 401 === error.status) {
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
        this.toaster.create({message, duration}).then(
            toast => toast.present()
        );
    }
}
