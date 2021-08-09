import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { ProfessionalList } from '@app/api/models';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Injectable()
export class ProfessionalGuard implements CanActivate {
  @Select(CurrentUserSelectors.defaultProfessional)
  public defaultProfessional$: Observable<ProfessionalList>;

  constructor(private readonly router: Router) {}

  public canActivate(routeSnapshot: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const path = routeSnapshot.url[0].path;

    if (path === 'my-profile') {
      return this.defaultProfessional$.pipe(
        first(x => !!x),
        map(professional => this.router.parseUrl(`/professional/${professional.id}/profile`)),
      );
    }

    if (path === 'my-services') {
      return this.defaultProfessional$.pipe(
        first(x => !!x),
        map(professional => this.router.parseUrl(`/professional/${professional.id}/services`)),
      );
    }

    return of(false);
  }
}
