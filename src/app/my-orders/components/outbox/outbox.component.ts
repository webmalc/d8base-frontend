import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { SentOrder } from '@app/api/models';
import { AccountsService } from '@app/api/services';
import { InfiniteScrollData, PaginatedResult } from '@app/infinite-scroll/models/infinite-scroll.model';
import { Tabs } from '@app/my-orders/enums/tabs.enum';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-outbox',
  templateUrl: './outbox.component.html',
  styleUrls: ['./outbox.component.scss'],
})
export class OutboxComponent implements AfterViewInit, OnDestroy {
  public tabs = Tabs;
  public orders: SentOrder[];

  public readonly doLoad$ = new Subject<InfiniteScrollData<AccountsService.AccountsOrdersSentListParams, SentOrder>>();
  private readonly apiRequestFunction: (
    params: AccountsService.AccountsOrdersReceivedListParams,
  ) => Observable<PaginatedResult<SentOrder>> = this.accountsService.accountsOrdersSentList.bind(this.accountsService);

  private readonly currentFilter$ = new BehaviorSubject<AccountsService.AccountsOrdersSentListParams>({
    statusIn: 'confirmed,paid,not_confirmed',
  });
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly accountsService: AccountsService, private readonly changeDetector: ChangeDetectorRef) {}

  public ngAfterViewInit(): void {
    this.currentFilter$
      .pipe(
        map(params => ({ params, apiRequestFunction: this.apiRequestFunction })),
        takeUntil(this.destroy$),
      )
      .subscribe(this.doLoad$);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }

  public changeTab(e: CustomEvent): void {
    switch (e.detail.value) {
      case Tabs.current:
        this.currentFilter$.next({ statusIn: 'confirmed,paid,not_confirmed' });
        break;
      case Tabs.archive:
        this.currentFilter$.next({ statusIn: 'completed,canceled' });
        break;
      default:
        this.currentFilter$.next({ statusIn: 'not_confirmed' });
        break;
    }
  }
}
