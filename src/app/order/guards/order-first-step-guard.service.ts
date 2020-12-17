import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    UrlTree
} from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { OrderWizardStateService } from '../services/order-wizard-state.service';

@Injectable()
export class OrderFirstStepGuardService implements CanActivate {
    constructor(
        private readonly wizardState: OrderWizardStateService,
        private readonly router: Router
    ) {}

    public canActivate(
        route: ActivatedRouteSnapshot
    ): Observable<boolean | UrlTree> {
        return this.wizardState.isStateEmpty().pipe(
            withLatestFrom(
                combineLatest([
                    this.wizardState.getCurrentStep(),
                    this.wizardState.getFirstStep()
                ])
            ),
            map(([isEmptyState, [step, firstStep]]) => {
                const routeStepId = route.routeConfig.path.split('/').pop();
                const serviceId = route.params.serviceId;
                if (routeStepId === firstStep.id || !isEmptyState) {
                    return true;
                }

                return this.router.parseUrl(
                    `order/${serviceId}/${firstStep.id}`
                );
            })
        );
    }
}
