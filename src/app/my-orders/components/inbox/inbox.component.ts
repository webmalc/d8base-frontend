import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ReceivedOrder } from '@app/core/models/received-order';
import { Tabs } from '@app/my-orders/enums/tabs.enum';
import { ReceivedOrdersApiService } from '@app/my-orders/services';
import { BehaviorSubject, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-inbox',
    templateUrl: './inbox.component.html',
    styleUrls: ['./inbox.component.scss'],
})
export class InboxComponent implements OnInit, OnDestroy {

    public orders: ReceivedOrder[];
    public tabs = Tabs;

    private readonly currentFilter$ = new BehaviorSubject<{ [param: string]: string }>({ status__in: 'new'});
    private readonly destroy$ = new Subject<void>();

    constructor(
        private readonly receivedOrdersApi: ReceivedOrdersApiService,
        private readonly changeDetector: ChangeDetectorRef,
    ) {
    }

    public ngOnInit(): void {
        this.currentFilter$.pipe(
            takeUntil(this.destroy$),
            switchMap(params => this.receivedOrdersApi.get(params)),
        ).subscribe(orders => {
            this.orders = orders.results;
            this.changeDetector.markForCheck();
        });
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
    }

    public changeTab(e: CustomEvent): void {
        const currentTab: Tabs = e.detail.value;
        switch (currentTab) {
            case Tabs.current:
                this.currentFilter$.next({ status__in: 'confirmed,paid'});
                break;
            case Tabs.archive:
                this.currentFilter$.next({ status__in: 'completed,canceled'});
                break;
            default:
                this.currentFilter$.next({ status__in: 'not_confirmed'});
                break;
        }
    }

    public onOrderAccept(order: ReceivedOrder): void {
        // TODO: change order status
    }
}
