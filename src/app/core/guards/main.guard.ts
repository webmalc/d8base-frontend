import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenManagerService} from '@app/auth/services/token-manager.service';
import {AuthenticationService} from '@app/auth/services/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class MainGuard implements CanActivate {

    constructor(private authService: AuthenticationService, private router: Router) {
    }

    canActivate(): Observable<boolean | UrlTree> {
        return new Observable<UrlTree | boolean>(subscriber => {
            // this.tokenManager.refreshTokens().subscribe(
            //     next => {
            //         if (!next) {
            //             subscriber.next(this.router.parseUrl('/auth/login'));
            //         } else {
            //             subscriber.next(true);
            //         }
            //         subscriber.complete();
            //     },
            //     _ => {
            //         subscriber.next(this.router.parseUrl('/auth/login'));
            //         subscriber.complete();
            //     }
            // );
        });
    }
}
