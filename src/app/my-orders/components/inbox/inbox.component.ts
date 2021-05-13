import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ReceivedOrder } from '@app/api/models';
import { AccountsService } from '@app/api/services';
import { InfiniteScrollData, PaginatedResult } from '@app/infinite-scroll/models/infinite-scroll.model';
import { Tabs } from '@app/my-orders/enums/tabs.enum';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select } from '@ngxs/store';
import { asyncScheduler, BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map, observeOn, switchMap, takeUntil } from 'rxjs/operators';

const DEFAULT_ORDER_STATUS: ReceivedOrder['status'] = 'not_confirmed';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
})
export class InboxComponent implements AfterViewInit, OnDestroy {
  @Select(CurrentUserSelectors.isAuthenticated)
  public isAuthenticated$: Observable<boolean>;

  public orders: ReceivedOrder[];
  public tabs = Tabs;

  public readonly doLoad$ = new Subject<
    InfiniteScrollData<AccountsService.AccountsOrdersReceivedListParams, ReceivedOrder>
  >();
  private readonly apiRequestFunction: (
    params: AccountsService.AccountsOrdersReceivedListParams,
  ) => Observable<PaginatedResult<ReceivedOrder>> = this.accountsService.accountsOrdersReceivedList.bind(
    this.accountsService,
  );

  private readonly currentFilter$ = new BehaviorSubject<AccountsService.AccountsOrdersReceivedListParams>({
    statusIn: DEFAULT_ORDER_STATUS,
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
    this.orders = null;
    const currentTab: Tabs = e.detail.value;
    switch (currentTab) {
      case Tabs.current:
        this.currentFilter$.next({ statusIn: 'confirmed,paid' });
        break;
      case Tabs.archive:
        this.currentFilter$.next({ statusIn: 'completed,canceled' });
        break;
      default:
        this.currentFilter$.next({ statusIn: 'not_confirmed' });
        break;
    }
  }

  public refresh(): void {
    this.currentFilter$.next(this.currentFilter$.value);
  }
}
