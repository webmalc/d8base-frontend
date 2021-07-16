import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { ServiceWizardPath } from '@app/service-wizard/const';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServiceWizardStateService } from '../services';

@Injectable()
export class ServiceFirstStepGuardService implements CanActivate {
  constructor(private readonly wizardState: ServiceWizardStateService, private readonly router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return combineLatest([this.wizardState.isStateEmpty(), this.wizardState.getFirstStep()]).pipe(
      map(([isEmptyState, firstStep]) => {
        const routeStepId = route.url[0]?.path;
        if (routeStepId === firstStep.id || !isEmptyState) {
          return true;
        }

        return this.router.parseUrl(`${ServiceWizardPath}/${firstStep.id}`);
      }),
    );
  }
}
