import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { SentOrder } from '@app/api/models';
import { AccountsService } from '@app/api/services';
import { InfiniteScrollData, PaginatedResult } from '@app/infinite-scroll/models/infinite-scroll.model';
import { Tabs } from '@app/my-orders/enums/tabs.enum';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select } from '@ngxs/store';
import { asyncScheduler, BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map, observeOn, switchMap, takeUntil } from 'rxjs/operators';

const activeStatusesFilter = 'confirmed,paid,not_confirmed';
const deprecatedStatusesFilter = 'completed,canceled,overdue';

@Component({
  selector: 'app-outbox',
  templateUrl: './outbox.component.html',
  styleUrls: ['./outbox.component.scss'],
})
export class OutboxComponent implements AfterViewInit, OnDestroy {
  @Select(CurrentUserSelectors.isAuthenticated)
  public isAuthenticated$: Observable<boolean>;

  public tabs = Tabs;
  public orders: SentOrder[];

  public readonly doLoad$ = new Subject<InfiniteScrollData<AccountsService.AccountsOrdersSentListParams, SentOrder>>();
  private readonly apiRequestFunction: (
    params: AccountsService.AccountsOrdersReceivedListParams,
  ) => Observable<PaginatedResult<SentOrder>> = this.accountsService.accountsOrdersSentList.bind(this.accountsService);

  private readonly currentFilter$ = new BehaviorSubject<AccountsService.AccountsOrdersSentListParams>({
    statusIn: activeStatusesFilter,
  });
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly accountsService: AccountsService) {}

  public ngAfterViewInit(): void {
    this.isAuthenticated$
      .pipe(
        filter(isAuthenticated => Boolean(isAuthenticated)),
        observeOn(asyncScheduler),
        switchMap(() =>
          this.currentFilter$.pipe(map(params => ({ params, apiRequestFunction: this.apiRequestFunction }))),
        ),
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
        this.currentFilter$.next({ statusIn: activeStatusesFilter });
        break;
      case Tabs.archive:
        this.currentFilter$.next({ statusIn: deprecatedStatusesFilter });
        break;
      default:
        this.currentFilter$.next({ statusIn: 'not_confirmed' });
        break;
    }
  }
}
