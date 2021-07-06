import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Search } from '@app/api/models';
import { SearchService } from '@app/api/services';
import { alignTimeInterval } from '@app/core/functions/datetime.functions';
import { NgDestroyService } from '@app/core/services';
import { InfiniteScrollData, PaginatedResult } from '@app/infinite-scroll/models/infinite-scroll.model';
import { SearchFilterStateService } from '@app/search/services/search-filter-state.service';
import { SearchQueryService } from '@app/search/services/search-query.service';
import { Platform } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { SearchFilterStateConverter } from '../../services/search-filter-state-converter.service';

@Component({
  selector: 'app-search',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgDestroyService],
})
export class SearchPage implements AfterViewInit {
  public searchResult: Search[];
  public readonly doLoad$ = new Subject<InfiniteScrollData<SearchService.SearchListParams, Search>>();
  public params: SearchService.SearchListParams;

  private readonly apiRequestFunction: (
    params: SearchService.SearchListParams,
  ) => Observable<PaginatedResult<Search>> = this.search.searchList.bind(this.search);

  constructor(
    public readonly platform: Platform,
    public readonly state: SearchFilterStateService,
    public readonly query: SearchQueryService,
    private readonly search: SearchService,
    private readonly cd: ChangeDetectorRef,
    private readonly route: ActivatedRoute,
    private readonly destroy$: NgDestroyService,
    private readonly searchFilterStateConverter: SearchFilterStateConverter,
  ) {
    this.patchFormValueOn(this.route.queryParams);
  }

  public ngAfterViewInit(): void {
    // we have to wait for infinite-scroll-container initialization before searching
    this.runSearchQueryOn(this.route.queryParams);
  }

  public onLoadResults(event): void {
    this.searchResult = event;
    this.cd.markForCheck();
  }

  public needToRenderFilters(): boolean {
    return this.platform.width() > 992;
  }

  public onSubmit(): void {
    this.query.searchByFormValue(this.state.searchForm.value);
  }

  public deleteFilter(key: string): void {
    this.query.deleteSearchParam(key);
  }

  private runSearchQuery(params: SearchService.SearchListParams): void {
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

  private runSearchQueryOn(params$: Observable<Params>): void {
    params$.pipe(takeUntil(this.destroy$)).subscribe(params => this.runSearchQuery(params));
  }

  private patchFormValueOn(params$: Observable<Params>): void {
    params$
      .pipe(
        switchMap(params => this.searchFilterStateConverter.getSearchFilterState(params)),
        takeUntil(this.destroy$),
      )
      .subscribe(formValue => {
        this.state.searchForm.patchValue(formValue);
        this.cd.markForCheck();
      });
  }
}
