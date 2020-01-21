import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {TokenManagerService} from '@app/auth/services/token-manager.service';
import {switchMap} from 'rxjs/operators';
import {AuthenticationService} from '@app/auth/services/authentication.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    constructor(private tokenManager: TokenManagerService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.tokenManager.getAccessToken())
            .pipe(
                switchMap(token => {
                    let headers;
                    if (AuthenticationService.getAuthUrls().includes(req.url)) {
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
