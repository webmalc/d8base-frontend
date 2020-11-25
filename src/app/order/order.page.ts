import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {OrdersApiService} from '@app/core/services/orders-api.service';
import {ServicesReadonlyApiService} from '@app/core/services/services-readonly-api.service';
import {MasterList} from '@app/master/models/master-list';
import {MasterReadonlyApiService} from '@app/master/services/master-readonly-api.service';
import {OrderDetails} from '@app/order/interfaces/order-details.interface';
import {orderSteps} from '@app/order/order-steps';
import {Service} from '@app/service/models/service';
import {Observable, Subject} from 'rxjs';
import {filter, switchMap, takeUntil, tap} from 'rxjs/operators';
import {OrderService} from './services/order.service';

@Component({
    selector: 'app-order',
    templateUrl: './order.page.html',
    styleUrls: ['./order.page.scss']
})
export class OrderPage implements OnInit, OnDestroy {
    public currentStepIndex: number;
    public steps = orderSteps;
    public service: Service;
    public master: MasterList;
    public order$: Observable<OrderDetails>;

    private serviceId: string;
    private readonly destroy$ = new Subject<void>();

    constructor(
        private readonly orderService: OrderService,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly servicesApi: ServicesReadonlyApiService,
        private readonly mastersApi: MasterReadonlyApiService,
        private readonly ordersApi: OrdersApiService
    ) {
        this.orderService.reset();
        this.order$ = this.orderService.order$;
        this.subscribeToRouterEvents();
    }

    public get isFirstStep(): boolean {
        return this.currentStepIndex === 0;
    }

    public get isLastStep(): boolean {
        return this.currentStepIndex === orderSteps.length - 1;
    }

    public get isFormValid(): boolean {
        return this.orderService.valid;
    }

    public ngOnInit(): void {
        this.serviceId = this.route.snapshot.params.id;
        this.servicesApi.getByEntityId(this.serviceId)
            .pipe(
                tap(service => this.service = service),
                switchMap(service => this.mastersApi.getByEntityId(service.professional))
            )
            .subscribe(master => this.master = master);
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
    }

    public next(): void {
        const nextStepIndex = this.currentStepIndex + 1;
        this.router.navigate(['order', this.serviceId, orderSteps[nextStepIndex].path]).then();
    }

    public back(): void {
        const prevStepIndex = this.currentStepIndex - 1;
        this.router.navigate(['order', this.serviceId, orderSteps[prevStepIndex].path]).then();
    }

    public submit(): void {
        const newOrder = {
            ...this.orderService.getOrderModel(),
            service: Number.parseInt(this.serviceId, 10)
        };
        this.ordersApi.postNewOrder(newOrder).subscribe(
            order => this.router.navigate(['order', 'done']).then(),
            order => this.router.navigate(['order', 'done']).then()
        );
    }

    private subscribeToRouterEvents(): void {
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                takeUntil(this.destroy$)
            )
            .subscribe((event: NavigationEnd) => this.onNavigatedTo(event.urlAfterRedirects));
    }

    private onNavigatedTo(url: string): void {
        this.currentStepIndex = orderSteps.findIndex(step => url.endsWith(step.path));
    }
}
