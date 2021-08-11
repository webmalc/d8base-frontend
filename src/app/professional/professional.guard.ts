import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { ProfessionalList } from '@app/api/models';
import { NavBranch, NavParams } from '@app/core/constants/navigation.constants';
import { getProfessionalProfileUrl, getProfessionalServicesUrl } from '@app/core/functions/navigation.functions';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';

// TODO separate into three different guards
@Injectable()
export class ProfessionalGuard implements CanActivate {
  @Select(CurrentUserSelectors.defaultProfessional)
  public defaultProfessional$: Observable<ProfessionalList>;

  constructor(private readonly router: Router) {}

  public canActivate(routeSnapshot: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const path: string = routeSnapshot.url?.length ? routeSnapshot.url[0].path : '';

    if (path === NavBranch.MyProfile) {
      return this.defaultProfessional$.pipe(
        first(x => !!x),
        map(professional => this.router.parseUrl(getProfessionalProfileUrl(professional.id))),
      );
    }

    if (path === NavBranch.MyServices) {
      return this.defaultProfessional$.pipe(
        first(x => !!x),
        map(professional => this.router.parseUrl(getProfessionalServicesUrl(professional.id))),
      );
    }

    if (path === '') {
      const masterId = routeSnapshot.params[NavParams.MasterId];
      return of(masterId ? this.router.parseUrl(getProfessionalProfileUrl(masterId)) : false);
    }

    return of(false);
  }
}
