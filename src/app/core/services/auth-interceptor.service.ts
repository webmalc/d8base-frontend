import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AuthenticationFactory} from '@app/core/services/authentication-factory.service';
import {EMPTY, from, Observable} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

/**
 *  Tries to refresh auth token if it has expired
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authFactory: AuthenticationFactory) {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        try {
            const url = new URL(req.url);
            if (url.origin !== environment.backend.url) {
                return next.handle(req);
            }
        } catch (e) {
            return next.handle(req);
        }
        if (this.getRestrictedUrls().includes(req.url)) {
            return next.handle(req);
        }

        return from(this.authFactory.getAuthenticator().needToRefresh())
            .pipe(
                switchMap(
                    (isNeedToRefresh: boolean) => {
                        if (isNeedToRefresh) {
                            return this.authFactory.getAuthenticator().refresh().pipe(
                                switchMap(() => next.handle(req)),
                                catchError(_ => EMPTY)
                            );
                        }

                        return next.handle(req);
                    }
                ),
                catchError(
                    _ => next.handle(req)
                )
            );
    }

    private getRestrictedUrls(): string[] {
        return [
            environment.backend.url + environment.backend.refresh
        ];
    }
}
