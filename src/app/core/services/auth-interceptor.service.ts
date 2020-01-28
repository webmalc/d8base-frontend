import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {from, Observable, of} from 'rxjs';
import {AuthenticationService} from '@app/core/services/authentication.service';
import {switchMap, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthenticationService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        try {
            const url = new URL(req.url);
            if (url.origin !== environment.backend.url || url.origin !== window.location.origin) {
                return next.handle(req);
            }
        } catch (e) {
            return next.handle(req);
        }
        if (this.getRestrictedUrls().includes(req.url)) {
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

    private getRestrictedUrls(): Array<string> {
        return [
            environment.backend.url + environment.backend.api_refresh_url
        ];
    }
}
