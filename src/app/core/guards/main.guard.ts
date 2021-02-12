import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MainGuard implements CanActivate {
  constructor(private readonly authenticator: AuthenticationService, private readonly router: Router) {}

  public canActivate(): Observable<boolean | UrlTree> {
    return this.authenticator.isAuthenticated$.pipe(
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        }
        return this.router.parseUrl('/auth/login');
      }),
    );
  }
}
