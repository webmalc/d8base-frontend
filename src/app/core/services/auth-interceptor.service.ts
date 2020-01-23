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

        return from(this.auth.needToRefresh())
            .pipe(
                switchMap(
                    (isNeedToRefresh: boolean) => {
                        if (isNeedToRefresh) {
                            return this.auth.refresh().pipe(switchMap(() => next.handle(req)));
                        }

                        return next.handle(req);
                    }
                )
            );
    }
}
