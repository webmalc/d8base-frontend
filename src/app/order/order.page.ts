import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesReadonlyApiService } from '@app/core/services/services-readonly-api.service';
import { MasterReadonlyApiService } from '@app/master/services/master-readonly-api.service';
import { StepContext, StepModel } from '@app/order/order-steps';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { catchError, exhaustMap, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ServicesApiCache } from '../core/services/cache';
import { UserManagerService } from '../core/services/user-manager.service';
import { SentOrdersApiService } from './services';
import { OrderWizardStateService } from './services/order-wizard-state.service';

@Component({
    selector: 'app-order',
    templateUrl: './order.page.html',
    styleUrls: ['./order.page.scss'],
    providers: [ServicesApiCache]
})
export class OrderPage {
    public get currentStep$(): Observable<StepModel> {
        return this.wizardState.getCurrentStep();
    }

    private readonly ngDestroy$ = new Subject<void>();
    private serviceId: number;

    constructor(
        private readonly wizardState: OrderWizardStateService,
        private readonly route: ActivatedRoute,
        private readonly servicesApi: ServicesReadonlyApiService,
        private readonly mastersApi: MasterReadonlyApiService,
        private readonly userManagerService: UserManagerService,
        private readonly ordersApi: SentOrdersApiService
    ) {}

    public ionViewWillEnter(): void {
        this.subscribeToRouteParams();
        this.subscribeSubmit();
    }

    public ionViewDidLeave(): void {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
        this.wizardState.resetWizard();
    }

    private subscribeSubmit(): void {
        this.wizardState
            .submit()
            .pipe(
                switchMap(() => this.wizardState.getState()),
                map(state => {
                    return Object.values(state).reduce(
                        (acc, curr) => {
                            return { ...acc, ...curr.data };
                        },
                        { service: this.serviceId }
                    );
                }),
                exhaustMap(order => this.ordersApi.create(order).pipe(catchError(error => of(error)))),
                takeUntil(this.ngDestroy$)
            )
            .subscribe(order => {
                // TODO Debug finalizing the order's wizard
            });
    }

    private setContext(serviceId: number): void {
        const contextObservable: Observable<StepContext> = forkJoin([
            this.servicesApi.getByEntityId(serviceId).pipe(
                switchMap(service =>
                    this.mastersApi.getByEntityId(service.professional).pipe(
                        map(professional => ({
                            service,
                            professional
                        }))
                    )
                )
            ),
            this.userManagerService.getCurrentUser()
        ]).pipe(
            map(([{ service, professional }, client]) => ({
                service,
                professional,
                client
            }))
        );
        this.wizardState.setContext(contextObservable);
    }

    private subscribeToRouteParams(): void {
        this.route.params
            .pipe(
                map(({ serviceId }) => serviceId),
                filter(serviceId => Boolean(serviceId)),
                takeUntil(this.ngDestroy$)
            )
            .subscribe(serviceId => {
                this.serviceId = serviceId;
                this.setContext(serviceId);
            });
    }
}
