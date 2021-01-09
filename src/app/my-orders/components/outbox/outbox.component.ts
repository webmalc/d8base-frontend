import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SentOrder } from '@app/core/models/sent-order';
import { Tabs } from '@app/my-orders/enums/tabs.enum';
import { SentOrdersApiService } from '@app/order/services';
import { BehaviorSubject, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-outbox',
    templateUrl: './outbox.component.html',
    styleUrls: ['./outbox.component.scss'],
})
export class OutboxComponent implements OnInit, OnDestroy {

    public tabs = Tabs;
    public orders: SentOrder[];
    private readonly currentFilter$ = new BehaviorSubject<{ [param: string]: string }>({ status__in: 'confirmed,paid,not_confirmed'});
    private readonly destroy$ = new Subject<void>();

    constructor(
        private readonly sentOrdersApi: SentOrdersApiService,
        private readonly changeDetector: ChangeDetectorRef,
    ) {
    }

    public ngOnInit(): void {
        this.currentFilter$.pipe(
            takeUntil(this.destroy$),
            switchMap(params => this.sentOrdersApi.get(params)),
        ).subscribe(orders => {
            this.orders = orders.results;
            this.changeDetector.markForCheck();
        });
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
    }

    public changeTab(e: CustomEvent): void {
        switch (e.detail.value) {
            case Tabs.current:
                this.currentFilter$.next({ status__in: 'confirmed,paid,not_confirmed'});
                break;
            case Tabs.archive:
                this.currentFilter$.next({ status__in: 'completed,canceled'});
                break;
            default:
                this.currentFilter$.next({ status__in: 'not_confirmed'});
                break;
        }
    }
}
