import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ReceivedOrder } from '@app/core/models/received-order';
import { OrderStatus } from '@app/core/types/order-status';
import { Tabs } from '@app/my-orders/enums/tabs.enum';
import { ReceivedOrdersApiService } from '@app/my-orders/services';
import { BehaviorSubject, Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

const DEFAULT_ORDER_STATUS: OrderStatus = 'not_confirmed';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
})
export class InboxComponent implements OnInit, OnDestroy {

  public orders: ReceivedOrder[];
  public tabs = Tabs;

  private readonly currentFilter$ = new BehaviorSubject<{ [param: string]: string }>({ status__in: DEFAULT_ORDER_STATUS });
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly receivedOrdersApi: ReceivedOrdersApiService,
    private readonly changeDetector: ChangeDetectorRef,
  ) {
  }

  public ngOnInit(): void {
    this.currentFilter$.pipe(
      switchMap(params => this.receivedOrdersApi.get(params)),
      takeUntil(this.destroy$),
    ).subscribe(orders => {
      this.orders = orders.results;
      this.changeDetector.markForCheck();
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }

  public changeTab(e: CustomEvent): void {
    this.orders = null;
    const currentTab: Tabs = e.detail.value;
    switch (currentTab) {
      case Tabs.current:
        this.currentFilter$.next({ status__in: 'confirmed,paid' });
        break;
      case Tabs.archive:
        this.currentFilter$.next({ status__in: 'completed,canceled' });
        break;
      default:
        this.currentFilter$.next({ status__in: 'not_confirmed' });
        break;
    }
  }

  public refresh(): void {
    this.currentFilter$.next(this.currentFilter$.value);
  }
}
