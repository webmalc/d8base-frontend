import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserLocation } from '@app/api/models/user-location';
import { Observable, of } from 'rxjs';
import UserLocationSelectors from '@app/store/current-user/user-locations/user-locations.selectors';
import { Select } from '@ngxs/store';
import { first, map } from 'rxjs/operators';

@Injectable()
export class SearchPageGuard implements CanActivate {
  @Select(UserLocationSelectors.defaultLocation)
  public defaultLocation$: Observable<UserLocation>;

  constructor(private readonly router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    const isParamsEmpty = !Object.keys(state.root.queryParams).length;

    return isParamsEmpty
      ? this.defaultLocation$.pipe(
          first(defaultLocation => Boolean(defaultLocation)),
          map(location =>
            !!location.country && !!location.city
              ? this.router.parseUrl(`/search?country=${location.country}&city=${location.city}`)
              : true,
          ),
        )
      : of(true);
  }
}
