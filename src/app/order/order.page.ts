import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SentOrder } from '@app/core/models/sent-order';
import { ServicesApiCache } from '@app/core/services/cache';
import { ServicesReadonlyApiService } from '@app/core/services/services-readonly-api.service';
import { UserManagerService } from '@app/core/services/user-manager.service';
import { MasterReadonlyApiService } from '@app/master/services/master-readonly-api.service';
import { forkJoin, Observable, Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { StepContext, StepModel } from './order-steps';
import { OrderWizardStateService, SentOrdersApiService } from './services';

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
        private readonly router: Router,
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
                withLatestFrom(this.wizardState.getState()),
                map(([, state]) => {
                    return Object.values(state).reduce(
                        (acc, curr) => {
                            return { ...acc, ...curr };
                        },
                        { service: this.serviceId }
                    );
                }),
                takeUntil(this.ngDestroy$)
            )
            .subscribe((order: SentOrder) => {
                this.createOrder(order);
            });
    }

    private createOrder(order: SentOrder): void {
        this.ordersApi.create(order).subscribe(({ id }) => {
            this.router.navigate(['/my-orders/outbox', id]);
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
