import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { NavBranch, NavPath } from '@app/core/constants/navigation.constants';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServiceBuilderService, ServiceWizardStateService } from '../services';

@Injectable()
export class ServiceFirstStepGuardService implements CanActivate {
  constructor(
    private readonly wizardState: ServiceWizardStateService,
    private readonly serviceBuilder: ServiceBuilderService,
    private readonly router: Router,
  ) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return combineLatest([this.serviceBuilder.isStateEmpty$, this.wizardState.getFirstStep()]).pipe(
      map(([isEmptyState, firstStep]) => {
        const routeStepId = route.url[0]?.path;
        if (routeStepId === firstStep.id || !isEmptyState) {
          return true;
        }

        return this.router.parseUrl(`/${NavPath.Service}/${NavBranch.Add}/${firstStep.id}`);
      }),
    );
  }
}
