import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { alignTimeInterval } from '@app/core/functions/datetime.functions';
import { NgDestroyService } from '@app/core/services';
import { HelperService } from '@app/core/services/helper.service';
import { InfiniteScrollData, PaginatedResult } from '@app/infinite-scroll/models/infinite-scroll.model';
import { SearchFilterStateService } from '@app/search/services/search-filter-state.service';
import UserLocationSelectors from '@app/store/current-user/user-locations/user-locations.selectors';
import { Platform } from '@ionic/angular';
import { Select } from '@ngxs/store';
import { Observable, of, Subject } from 'rxjs';
import { first, switchMap, takeUntil } from 'rxjs/operators';
import { Search, UserLocation } from '../api/models';
import { SearchService } from '../api/services';
import { SearchFilterStateConverter } from './services/search-filter-state-converter.service';

@Component({
  selector: 'app-search',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgDestroyService],
})
export class SearchPage implements OnInit, AfterViewInit {
  @Select(UserLocationSelectors.defaultLocation)
  public defaultLocation$: Observable<UserLocation>;

  public searchResult: Search[];
  public searchResultTitle: string;

  public readonly doLoad$ = new Subject<InfiniteScrollData<SearchService.SearchListParams, Search>>();
  private readonly apiRequestFunction: (
    params: SearchService.SearchListParams,
  ) => Observable<PaginatedResult<Search>> = this.search.searchList.bind(this.search);
  private params: SearchService.SearchListParams;

  constructor(
    public readonly platform: Platform,
    public readonly state: SearchFilterStateService,
    private readonly search: SearchService,
    private readonly cd: ChangeDetectorRef,
    private readonly route: ActivatedRoute,
    private readonly ngUnsubscribe$: NgDestroyService,
    private readonly searchFilterStateConverter: SearchFilterStateConverter,
  ) {}

  public ngOnInit(): void {
    this.state.isDoingSearch$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
      this.doSearch();
    });
  }

  public ngAfterViewInit(): void {
    this.subscribeQueryParams();
  }

  public onLoadResults(event): void {
    this.searchResult = event;
    this.cd.markForCheck();
  }

  public declineIsWaiting(num: number): string {
    return HelperService.declination(num, [
      'declination.is-waiting.1',
      'declination.is-waiting.2',
      'declination.is-waiting.3',
    ]);
  }

  public declineProposal(num: number): string {
    return HelperService.declination(num, [
      'declination.proposal.1',
      'declination.proposal.2',
      'declination.proposal.3',
    ]);
  }

  public needToRenderFilters(): boolean {
    return this.platform.width() > 992;
  }

  public doSearch(): void {
    const params = this.searchFilterStateConverter.getSearchListParams(this.state.searchForm.value);
    const { startDatetime, endDatetime } = alignTimeInterval(params.startDatetime, params.endDatetime);
    this.params = {
      ...params,
      startDatetime,
      endDatetime,
    };
    this.doLoad$.next({
      params: this.params,
      apiRequestFunction: this.apiRequestFunction,
    });
  }

  public onSubmit(): void {
    this.state.doSearch();
  }

  private subscribeQueryParams(): void {
    this.route.queryParams
      .pipe(
        first(),
        switchMap(params => {
          const isParamsEmpty = !Object.keys(params).length;
          if (isParamsEmpty) {
            return this.defaultLocation$.pipe(first(defaultLocation => Boolean(defaultLocation)));
          }
          return of(params);
        }),
        switchMap(params => this.searchFilterStateConverter.getSearchFilterState(params)),
      )
      .subscribe(params => {
        this.state.searchForm.patchValue(params);
        this.state.doSearch();
      });
  }
}
