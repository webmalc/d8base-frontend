import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthenticationFactory} from '@app/core/services/authentication-factory.service';
import {HelperService} from '@app/core/services/helper.service';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

/**
 *  Tries to refresh auth token if it has expired
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private readonly authFactory: AuthenticationFactory
    ) {
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
        if (
            this.getRestrictedUrls().includes(req.url) ||
            (req.method === 'GET' && HelperService.isNoAuthGetUrl(req.url))
        ) {
            return next.handle(req);
        }

        return this.authFactory.getAuthenticator().needToRefresh().pipe(
            switchMap(
                (isNeedToRefresh: boolean) => isNeedToRefresh ?
                    this.authFactory.getAuthenticator().refresh().pipe(
                        switchMap(() => next.handle(req))
                    ) : next.handle(req)
            )
        );
    }

    private getRestrictedUrls(): string[] {
        return [
            environment.backend.url + environment.backend.refresh,
            environment.backend.url + environment.backend.register,
            environment.backend.url + environment.backend.auth,
            environment.backend.url + environment.backend.reset_password,
            environment.backend.url + environment.backend.reset_password_link
        ];
    }
}
