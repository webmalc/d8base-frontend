import {Location} from '@angular/common';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {Category} from '@app/core/models/category';
import {HelperService} from '@app/core/services/helper.service';
import {MainPageSearchInterface} from '@app/main/interfaces/main-page-search-interface';
import {SearchLocationDataInterface} from '@app/main/interfaces/search-location-data-interface';
import {SearchFilterStateService} from '@app/search/services/search-filter-state.service';
import {Reinitable} from '@app/shared/abstract/reinitable';
import {Platform} from '@ionic/angular';
import {Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {Search} from '../api/models';
import {PaginatedResult} from '../api/models/paginated-result';
import {SearchService} from '../api/services';
import { SearchFilterStateInterface } from './interfaces/search-filter-state-interface';
import { searchFilterStateInterfaceToSearchListParamsAdapter } from './search-params.adapter';

@Component({
    selector: 'app-search',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPage extends Reinitable implements OnDestroy {

    public searchNeedle: string;
    public searchResult: Search[];
    public searchResultTitle: string;

    private readonly ngDestroy$ = new Subject<void>();

    constructor(
        private readonly search: SearchService,
        public readonly platform: Platform,
        private readonly location: Location,
        private readonly state: SearchFilterStateService,
        private readonly cd: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnDestroy(): void {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }

    public init(): void {
        if (this.location.getState().hasOwnProperty('data')) {
            this.state.setLocationData((this.location.getState() as { data: MainPageSearchInterface }).data.location);
            this.searchNeedle = (this.location.getState() as { data: MainPageSearchInterface }).data.needle;
            this.doSearch();
        } else if (this.location.getState().hasOwnProperty('category') && this.location.getState().hasOwnProperty('location')) {
            const data = this.location.getState() as { category: Category, location: SearchLocationDataInterface };
            this.state.setLocationData(data.location);
            this.state.data.main.category = [data.category];
            this.doSearch();
        }
    }

    public declineIsWaiting(num: number): string {
        return HelperService.declination(
            num,
            ['declination.is-waiting.1', 'declination.is-waiting.2', 'declination.is-waiting.3']
        );
    }

    public declineProposal(num: number): string {
        return HelperService.declination(
            num,
            ['declination.proposal.1', 'declination.proposal.2', 'declination.proposal.3']
        );
    }

    public needToRenderFilters(): boolean {
        return this.platform.width() > 992;
    }

    public doSearch(filters: SearchFilterStateInterface = null): void {
        const params = searchFilterStateInterfaceToSearchListParamsAdapter(filters);
         this.search.searchList({ ...params, query: this.searchNeedle }).pipe(
            map((response: PaginatedResult) => response.results),
            takeUntil(this.ngDestroy$)
        ).subscribe((results: Search[]) => {
            this.searchResult = results;
            this.searchResultTitle = this.searchNeedle;
            this.cd.markForCheck();
        });
    }
}
