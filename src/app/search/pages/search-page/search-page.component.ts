import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Search } from '@app/api/models';
import { SearchService } from '@app/api/services';
import { hasNonEmptyValues } from '@app/core/functions/object.functions';
import { NgDestroyService, SearchFilterStateConverter } from '@app/core/services';
import { SearchFilterStateService } from '@app/core/services/search/search-filter-state.service';
import { SearchQueryService } from '@app/core/services/search/search-query.service';
import { InfiniteScrollData, PaginatedResult } from '@app/shared/infinite-scroll/models/infinite-scroll.model';
import { IonSplitPane, Platform } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { map, startWith, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgDestroyService],
})
export class SearchPage implements AfterViewInit {
  @ViewChild('filtersPane')
  public readonly splitPane: IonSplitPane;

  public searchResult: Search[];
  public params: SearchService.SearchListParams;
  public readonly doLoad$ = new Subject<InfiniteScrollData<SearchService.SearchListParams, Search>>();
  public showFiltersButton$: Observable<boolean>; // = new BehaviorSubject<boolean>(true);

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
    this.showFiltersButton$ = this.splitPane.ionSplitPaneVisible.pipe(
      map(event => !event.detail.visible),
      startWith(true),
    );
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

  public updateSearchResults(): void {
    this.query.searchByFormValue(this.state.form.value);
  }

  public deleteFilter(key: string): void {
    this.query.setSearchParam(key, null);
  }

  public editFilter(options: { key: string; value: string }): void {
    this.query.setSearchParam(options.key, options.value);
  }

  public hasFilters(): boolean {
    return hasNonEmptyValues(this.params);
  }

  private runSearchQuery(params: SearchService.SearchListParams): void {
    this.params = {
      ...params,
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
        this.state.patchValue(formValue);
        this.cd.markForCheck();
      });
  }
}
