import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {TokenManagerService} from '@app/core/services/token-manager.service';
import {environment} from '../../../environments/environment';

/**
 * Sets headers while requesting api endpoints
 */
@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

    constructor(private tokenManager: TokenManagerService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        try {
            const url = new URL(req.url);
            if (url.origin !== environment.backend.url) {
                return next.handle(req);
            }
        } catch (e) {
            return next.handle(req);
        }

        return from(this.tokenManager.getAccessToken())
            .pipe(
                switchMap(token => {
                    let headers;
                    if (null === token) {
                        headers = req.headers
                            .append('Content-Type', 'application/json');
                    } else {
                        headers = req.headers
                            .set('Authorization', 'Bearer ' + token)
                            .append('Content-Type', 'application/json');
                    }
                    const requestClone = req.clone({
                        headers
                    });

                    return next.handle(requestClone);
                })
            );
    }
}
