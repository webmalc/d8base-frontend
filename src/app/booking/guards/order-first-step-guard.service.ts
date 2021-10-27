import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderWizardStateService } from '../services';

@Injectable()
export class OrderFirstStepGuardService implements CanActivate {
  constructor(private readonly wizardState: OrderWizardStateService, private readonly router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return combineLatest([this.wizardState.isStateEmpty(), this.wizardState.getFirstStep()]).pipe(
      map(([isEmptyState, firstStep]) => {
        const routeStepId = route.url[0]?.path;
        const serviceId = route.params.serviceId;
        if (routeStepId === firstStep.id || !isEmptyState) {
          return true;
        }

        return this.router.parseUrl(`order/${serviceId}/${firstStep.id}`);
      }),
    );
  }
}
