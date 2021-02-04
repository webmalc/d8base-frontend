import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { Observable } from 'rxjs';
import { first, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MainGuard implements CanActivate {

  constructor(private readonly authenticator: AuthenticationService, private readonly router: Router) {
  }

  public canActivate(): Observable<boolean | UrlTree> {
    return new Observable<UrlTree | boolean>(subscriber => {
      this.authenticator.isAuthenticated$.pipe(take(1)).subscribe(
        isAuthenticated => {
          !isAuthenticated ? subscriber.next(this.router.parseUrl('/auth/login')) : subscriber.next(true);
          subscriber.complete();
        },
        () => {
          subscriber.next(this.router.parseUrl('/auth/login'));
          subscriber.complete();
        },
      );
    });
  }
}
