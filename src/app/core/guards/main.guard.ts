import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationFactory} from '@app/core/services/authentication-factory.service';

@Injectable({
    providedIn: 'root'
})
export class MainGuard implements CanActivate {

    constructor(private authFactory: AuthenticationFactory, private router: Router) {
    }

    canActivate(): Observable<boolean | UrlTree> {
        return new Observable<UrlTree | boolean>(subscriber => {
            this.authFactory.getAuthenticator().isAuthenticated().then(
                isAuthenticated => {
                    if (!isAuthenticated) {
                        subscriber.next(this.router.parseUrl('/auth/login'));
                    } else {
                        subscriber.next(true);
                    }
                    subscriber.complete();
                }
            );
        });
    }
}
