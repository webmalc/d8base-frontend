import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderPostModel} from '@app/core/models/order-model';
import {OrdersApiService} from '@app/core/services/orders-api.service';
import {ServicesReadonlyApiService} from '@app/core/services/services-readonly-api.service';
import {MasterList} from '@app/master/models/master-list';
import {MasterReadonlyApiService} from '@app/master/services/master-readonly-api.service';
import {orderSteps} from '@app/order/order-steps';
import {Service} from '@app/service/models/service';
import {Observable, Subject} from 'rxjs';
import {map, switchMap, takeUntil} from 'rxjs/operators';
import {OrderWizardStateService} from './services/order-wizard-state.service';

@Component({
    selector: 'app-order',
    templateUrl: './order.page.html',
    styleUrls: ['./order.page.scss']
})
export class OrderPage implements OnInit, OnDestroy {
    public currentStepIndex: number;
    public currentStepTitle: string;

    public service$: Observable<Service>;
    public master$: Observable<MasterList>;
    public order$: Observable<Partial<OrderPostModel>>;
    public step$: Observable<number>;

    private serviceId: string;
    private readonly destroy$ = new Subject<void>();

    constructor(
        private readonly wizardState: OrderWizardStateService,
        private readonly route: ActivatedRoute,
        private readonly servicesApi: ServicesReadonlyApiService,
        private readonly mastersApi: MasterReadonlyApiService,
        private readonly ordersApi: OrdersApiService
    ) {
        this.order$ = this.wizardState.order$;
        this.service$ = this.wizardState.service$;
        this.master$ = this.wizardState.master$;

        this.subscribeToCurrentStepChange();
    }

    public ngOnInit(): void {
        this.serviceId = this.route.snapshot.params.id;
        this.servicesApi.getByEntityId(this.serviceId)
            .pipe(switchMap(service =>
                this.mastersApi.getByEntityId(service.professional).pipe(map(master => ({service, master})))
            ))
            .subscribe(context => this.wizardState.setContext(context));
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
    }

    public submit(): void {
        const newOrder = {
            ...this.wizardState.getOrderModel(),
            service: Number.parseInt(this.serviceId, 10)
        };
        this.ordersApi.create(newOrder).subscribe(order => this.wizardState.finalize(order));
    }

    private subscribeToCurrentStepChange(): void {
        this.route.params
            .pipe(
                map(params => params.step),
                takeUntil(this.destroy$)
            )
            .subscribe((index) => {
                this.currentStepIndex = index;
                this.currentStepTitle = orderSteps[index];
            });
    }
}
