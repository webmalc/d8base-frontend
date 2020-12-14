import {isPlatformServer} from '@angular/common';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '@env/environment';
import {ToastController} from '@ionic/angular';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import * as ErrorMessages from './error-messages';

const ERROR_TOAST_DURATION_MS = 3000;

/**
 * Shows error messages from server
 */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(
        private readonly toaster: ToastController,
        private readonly router: Router,
        @Inject(PLATFORM_ID) private readonly platformId: object
    ) {
    }

    public intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((httpErrorResponse: HttpErrorResponse) => {
                this.handleHttpErrorResponse(httpErrorResponse);
                return throwError(httpErrorResponse);
            })
        ) as Observable<HttpEvent<any>>;
    }

    private handleHttpErrorResponse(response: HttpErrorResponse): void {
        if (400 === response.status) {
            const all = response.error?.error?.__all__ || response.error?.__all__;
            const messages: string[] = Array.isArray(all)
                ? all
                : Object.entries(response.error).map(e => `${e[0]}: ${e[1]}`);
            if (messages.length > 0) {
                messages.forEach(message => this.showMessage(message));
            } else {
                this.showMessage(response.message);
            }

            return;
        }

        if (401 === response.status || 'invalid_grant' === response.message) {
            if (response.url.endsWith(environment.backend.refresh)) {
                this.showMessage(ErrorMessages.AUTHENTICATION_ERROR);
                this.router.navigateByUrl('/auth/login'); // TODO maintain SRP
            }

            return;
        }

        if (5 === Math.floor(response.status / 100)) {
            this.showMessage(ErrorMessages.GENERIC_SERVER_ERROR);

            return;
        }

        this.showMessage(response.message || ErrorMessages.UNKNOWN_ERROR);
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
