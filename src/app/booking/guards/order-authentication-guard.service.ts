import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { NavBranch, NavPath, NavQueryParams } from '@app/core/constants/navigation.constants';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class OrderAuthenticationGuardService implements CanActivate {
  constructor(private readonly authService: AuthenticationService, private readonly router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return combineLatest([this.authService.isAuthenticated$]).pipe(
      map(([isAuth]) => {
        if (isAuth) {
          return true;
        }
        const newUser = Boolean(route.queryParamMap.get(NavQueryParams.newUser));
        const serviceId = route.params.serviceId;
        const path = route.url[0].path;
        return newUser
          ? this.router.parseUrl(
              `${NavPath.Auth}/${NavBranch.Registration}?${NavQueryParams.redirectTo}=${NavPath.Order}/${serviceId}/${path}`,
            )
          : this.router.parseUrl(
              `${NavPath.Auth}/${NavBranch.Login}?${NavQueryParams.redirectTo}=${NavPath.Order}/${serviceId}/${path}`,
            );
      }),
    );
  }
}
