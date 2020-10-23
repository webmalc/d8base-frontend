import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {TokenManagerService} from '@app/core/services/token-manager.service';
import {from, Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

/**
 * Sets headers while requesting api endpoints
 */
@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

    constructor(private readonly tokenManager: TokenManagerService) {
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

        return from(this.tokenManager.getAccessToken())
            .pipe(
                switchMap(token => {
                    let headers;
                    if (this.getExcludedUrls().includes(req.url)) {
                        headers = req.headers.append('Content-Type', 'application/json');
                    } else if (this.getAuthUrls().includes(req.url)) {
                        headers = req.headers.append('Authorization', 'Basic ' +
                            btoa(`${environment.client_id}:${environment.client_secret}`))
                            .append('Content-Type', 'application/json');
                    } else if (token) {
                        headers = req.headers.append('Authorization', 'Bearer ' + token)
                            .append('Content-Type', 'application/json');
                    }

                    return next.handle(req.clone({headers}));
                })
            );
    }

    private getAuthUrls(): string[] {
        return [
            environment.backend.url + environment.backend.refresh
        ];
    }

    private getExcludedUrls(): string[] {
        return [
            environment.backend.url + environment.backend.countries,
            environment.backend.url + environment.backend.cities,
            environment.backend.url + environment.backend.reset_password_link,
            environment.backend.url + environment.backend.reset_password
        ];
    }
}
