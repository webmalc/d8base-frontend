import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {from, Observable, of} from 'rxjs';
import {TokenManagerService} from '@app/core/services/token-manager.service';
import {AuthenticationService} from '@app/core/services/authentication.service';
import {filter, finalize, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private tokenManager: TokenManagerService, private auth: AuthenticationService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.url === environment.backend.url + environment.backend.api_refresh_url) {
            return next.handle(req);
        }

        return this.refresh().pipe(switchMap(_ => next.handle(req)));
    }

    private refresh(): Observable<void | {}> {
        return from(this.tokenManager.isAccessTokenExpired())
            .pipe(
                switchMap(
                    (isAccessExpired: boolean) => {
                        if (isAccessExpired) {
                            return from(this.tokenManager.isRefreshTokenExpired())
                                .pipe(
                                    switchMap(
                                        (isRefreshExpired: boolean) => {
                                            if (!isRefreshExpired) {
                                                return this.auth.refresh();
                                            }
                                        }
                                    )
                                );
                        } else {
                            console.log('in of');
                            return of();
                        }
                    }
                ),
                finalize(() => console.log('end'))
            );
    }
}
