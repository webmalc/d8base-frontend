import {Location} from '@angular/common';
import {Component} from '@angular/core';
import {Category} from '@app/core/models/category';
import {HelperService} from '@app/core/services/helper.service';
import {MainPageSearchInterface} from '@app/main/interfaces/main-page-search-interface';
import {SearchLocationDataInterface} from '@app/main/interfaces/search-location-data-interface';
import {SearchResultsInterface} from '@app/search/interfaces/search-results-interface';
import {SearchFilterStateService} from '@app/search/services/search-filter-state.service';
import {SearchService} from '@app/search/services/search.service';
import {Reinitable} from '@app/shared/abstract/reinitable';
import {Platform} from '@ionic/angular';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-search',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.scss']
})
export class SearchPage extends Reinitable {

    public searchNeedle: string;
    public searchResult: SearchResultsInterface[];
    public searchResultTitle: string;

    constructor(
        private readonly search: SearchService,
        public readonly platform: Platform,
        private readonly location: Location,
        private readonly state: SearchFilterStateService
    ) {
        super();
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

    public doSearch(): void {
        this.search.search(this.searchNeedle, this.state.data).pipe(
            tap(() => this.searchResultTitle = this.searchNeedle)
        ).subscribe(
            data => this.searchResult = data
        );
    }
}
