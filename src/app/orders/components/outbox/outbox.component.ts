import { AfterViewInit, Component } from '@angular/core';
import { SentOrder } from '@app/api/models';
import { AccountsService } from '@app/api/services';
import { NgDestroyService } from '@app/core/services';
import { InfiniteScrollData, PaginatedResult } from '@app/shared/infinite-scroll/models/infinite-scroll.model';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select } from '@ngxs/store';
import { asyncScheduler, BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, observeOn, switchMap, takeUntil } from 'rxjs/operators';

const defaultOrderStatus: SentOrder['status'] = 'not_confirmed';
const activeStatusesFilter = 'confirmed,paid,not_confirmed';
const deprecatedStatusesFilter = 'completed,canceled,overdue';

@Component({
  selector: 'app-outbox',
  templateUrl: './outbox.component.html',
  styleUrls: ['./outbox.component.scss'],
  providers: [NgDestroyService],
})
export class OutboxComponent implements AfterViewInit {
  @Select(CurrentUserSelectors.isAuthenticated)
  public isAuthenticated$: Observable<boolean>;

  public tabs = {
    current: 'current',
    archive: 'archived',
  };
  public orders: SentOrder[];
  public readonly doLoad$ = new Subject<InfiniteScrollData<AccountsService.AccountsOrdersSentListParams, SentOrder>>();

  private readonly apiRequestFunction: (
    params: AccountsService.AccountsOrdersReceivedListParams,
  ) => Observable<PaginatedResult<SentOrder>> = this.accountsService.accountsOrdersSentList.bind(this.accountsService);

  private readonly currentFilter$ = new BehaviorSubject<AccountsService.AccountsOrdersSentListParams>({
    statusIn: activeStatusesFilter,
  });

  private readonly refresh$ = new BehaviorSubject<void>(void 0);

  constructor(private readonly accountsService: AccountsService, private readonly destroy$: NgDestroyService) {}

  public ngAfterViewInit(): void {
    this.isAuthenticated$
      .pipe(
        filter(isAuthenticated => Boolean(isAuthenticated)),
        observeOn(asyncScheduler),
        switchMap(() =>
          combineLatest([
            this.currentFilter$.pipe(map(params => ({ params, apiRequestFunction: this.apiRequestFunction }))),
            this.refresh$,
          ]),
        ),
        map(([value]) => value),
        takeUntil(this.destroy$),
      )
      .subscribe(this.doLoad$);
  }

  public changeTab(e: CustomEvent): void {
    switch (e.detail.value) {
      case this.tabs.current:
        this.currentFilter$.next({ statusIn: activeStatusesFilter });
        break;
      case this.tabs.archive:
        this.currentFilter$.next({ statusIn: deprecatedStatusesFilter });
        break;
      default:
        this.currentFilter$.next({ statusIn: defaultOrderStatus });
        break;
    }
  }

  public refresh(): void {
    this.refresh$.next();
  }
}
