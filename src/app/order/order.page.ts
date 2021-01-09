import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SentOrder} from '@app/core/models/sent-order';
import {ServicesApiCache} from '@app/core/services/cache';
import {ServicesReadonlyApiService} from '@app/core/services/services-readonly-api.service';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {MasterReadonlyApiService} from '@app/master/services/master-readonly-api.service';
import {forkJoin, Subject} from 'rxjs';
import {filter, first, map, switchMap, takeUntil} from 'rxjs/operators';
import {OrderWizardStateService, SentOrdersApiService} from './services';

@Component({
    selector: 'app-order',
    templateUrl: './order.page.html',
    styleUrls: ['./order.page.scss'],
    providers: [ServicesApiCache],
})
export class OrderPage {

    private readonly ngDestroy$ = new Subject<void>();
    private serviceId: number;

    constructor(
        private readonly wizardState: OrderWizardStateService,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly servicesApi: ServicesReadonlyApiService,
        private readonly mastersApi: MasterReadonlyApiService,
        private readonly userManagerService: UserManagerService,
        private readonly ordersApi: SentOrdersApiService,
    ) {
    }

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
                map((state) => {
                    return Object.values(state).reduce(
                        (acc, curr) => {
                            return {...acc, ...curr};
                        },
                        {service: this.serviceId},
                    );
                }),
                takeUntil(this.ngDestroy$),
            )
            .subscribe((order: SentOrder) => {
                this.createOrder(order);
            });
    }

    private createOrder(order: SentOrder): void {
        this.ordersApi.create(order).subscribe(({id}) => {
            this.router.navigate(['/', 'my-orders', 'outbox', id]);
        });
    }

    private setContext(serviceId: number): void {
        forkJoin([
            this.servicesApi.getByEntityId(serviceId).pipe(
                switchMap(service =>
                    this.mastersApi.getByEntityId(service.professional).pipe(
                        map(professional => ({
                            service,
                            professional,
                        })),
                    ),
                ),
            ),
            this.userManagerService.getCurrentUser(),
        ]).pipe(first()).subscribe(async ([{service, professional}, client]) => {
                await this.wizardState.setContext({
                    service,
                    professional,
                    client,
                });
            });
    }

    private subscribeToRouteParams(): void {
        this.route.params
            .pipe(
                map(({serviceId}) => serviceId),
                filter(serviceId => Boolean(serviceId)),
                takeUntil(this.ngDestroy$),
            )
            .subscribe(serviceId => {
                this.serviceId = serviceId;
                this.setContext(serviceId);
            });
    }
}
