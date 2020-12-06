import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {OrderModel} from '@app/core/models/order-model';
import {BehaviorSubject, Subject} from 'rxjs';
import {switchMap, takeUntil} from 'rxjs/operators';

import {Tabs} from './enums/tabs.enum';
import {ReceivedOrdersApiService, ServicesApiCache} from './services';

@Component({
    selector: 'app-inbox-page',
    templateUrl: './inbox-page.component.html',
    styleUrls: ['./inbox-page.component.scss'],
    providers: [ServicesApiCache]
})
export class InboxPageComponent implements OnInit {
    public orders: OrderModel[];
    public tabs = Tabs;

    private readonly currentFilter$ = new BehaviorSubject<{ [param: string]: string }>({status__in: 'new'});
    private readonly destroy$ = new Subject<void>();

    constructor(
        private readonly receivedOrdersApi: ReceivedOrdersApiService,
        private readonly changeDetector: ChangeDetectorRef
    ) {
    }

    public ngOnInit(): void {
        this.currentFilter$.pipe(
            takeUntil(this.destroy$),
            switchMap(params => this.receivedOrdersApi.get(params))
        ).subscribe(orders => {
            this.orders = orders.results;
            this.changeDetector.markForCheck();
        });
    }

    public changeTab(e: CustomEvent): void {
        const currentTab: Tabs = e.detail.value;
        switch (currentTab) {
            case Tabs.current:
                this.currentFilter$.next({status__in: 'confirmed,paid'});
                break;
            case Tabs.archive:
                this.currentFilter$.next({status__in: 'completed,canceled'});
                break;
            default:
                this.currentFilter$.next({status__in: 'not_confirmed'});
                break;
        }
    }

    public onOrderAccept(order: OrderModel): void {
        // TODO: change order status
    }
}
