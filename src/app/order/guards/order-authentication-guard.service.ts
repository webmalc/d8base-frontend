import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class OrderAuthenticationGuardService implements CanActivate {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly router: Router,
  ) {
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
  ): Observable<boolean | UrlTree> {
    return combineLatest([
      this.authService.isAuthenticated$,
    ]).pipe(
      map(([isAuth]) => {
        if (isAuth) {
          return true;
        }
        const serviceId = route.params.serviceId;

        return this.router.parseUrl(
          `order/${serviceId}/contact-info`,
        );
      }),
    );
  }
}
