import { Location } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '@app/core/models/category';
import { HelperService } from '@app/core/services/helper.service';
import { InfiniteScrollData, PaginatedResult } from '@app/infinite-scroll/models/infinite-scroll.model';
import { MainPageSearchInterface } from '@app/main/interfaces/main-page-search-interface';
import { SearchLocationDataInterface } from '@app/main/interfaces/search-location-data-interface';
import { SearchFilterStateService } from '@app/search/services/search-filter-state.service';
import { Reinitable } from '@app/shared/abstract/reinitable';
import { Platform } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Search } from '../api/models';
import { SearchService } from '../api/services';
import { searchFilterStateInterfaceToSearchListParamsAdapter } from './search-params.adapter';

@Component({
  selector: 'app-search',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPage extends Reinitable implements OnDestroy, OnInit {
  public searchResult: Search[];
  public searchResultTitle: string;

  public readonly doLoad$ = new Subject<InfiniteScrollData<SearchService.SearchListParams, Search>>();
  private readonly apiRequestFunction: (
    params: SearchService.SearchListParams,
  ) => Observable<PaginatedResult<Search>> = this.search.searchList.bind(this.search);
  private params: SearchService.SearchListParams;

  private readonly ngUnsubscribe$ = new Subject<void>();

  constructor(
    public readonly platform: Platform,
    public readonly state: SearchFilterStateService,
    private readonly search: SearchService,
    private readonly location: Location,
    private readonly cd: ChangeDetectorRef,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.state.isDoingSearch$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
      this.doSearch();
    });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public onLoadResults(event): void {
    this.searchResult = event;
    this.cd.markForCheck();
  }

  public init(): void {
    const state = this.location.getState();
    if (state.hasOwnProperty('data')) {
      const data = (state as { data: MainPageSearchInterface }).data;
      this.state.setLocationData(data.location);
      this.state.setDate(data.datetime);
      this.state.searchForm.get('query').setValue(data.needle);
      this.doSearch();
    } else if (state.hasOwnProperty('category') && state.hasOwnProperty('location')) {
      const data = state as { category: Category; location: SearchLocationDataInterface };
      this.state.setLocationData(data.location);
      this.state.searchForm.get('category').setValue([data.category]);
      this.doSearch();
    }
  }

  public declineIsWaiting(num: number): string {
    return HelperService.declination(num, ['declination.is-waiting.1', 'declination.is-waiting.2', 'declination.is-waiting.3']);
  }

  public declineProposal(num: number): string {
    return HelperService.declination(num, ['declination.proposal.1', 'declination.proposal.2', 'declination.proposal.3']);
  }

  public needToRenderFilters(): boolean {
    return this.platform.width() > 992;
  }

  public doSearch(): void {
    this.params = { ...searchFilterStateInterfaceToSearchListParamsAdapter(this.state.searchForm.value) };
    this.doLoad$.next({
      params: this.params,
      apiRequestFunction: this.apiRequestFunction,
    });
  }

  public onSubmit(): void {
    this.doSearch();
  }
}
