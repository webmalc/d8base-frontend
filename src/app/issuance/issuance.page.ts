import {Component, OnInit} from '@angular/core';
import {HelperService} from '@app/core/services/helper.service';
import {IssuanceFilterStateInterface} from '@app/issuance/interfaces/issuance-filter-state-interface';
import {SearchResultsInterface} from '@app/issuance/interfaces/search-results-interface';
import {FiltersPage} from '@app/issuance/pages/filters/filters.page';
import {SearchService} from '@app/issuance/services/search.service';
import {Platform} from '@ionic/angular';
import {filter, tap} from 'rxjs/operators';

@Component({
    selector: 'app-issuance',
    templateUrl: './issuance.page.html',
    styleUrls: ['./issuance.page.scss']
})
export class IssuancePage implements OnInit {

    public searchNeedle: string;
    public searchResult: SearchResultsInterface[];
    public searchResultTitle: string;

    constructor(
        private readonly search: SearchService,
        public readonly platform: Platform
    ) {
    }

    public ngOnInit(): void {
        this.searchRaw();
        this.subscribeToFiltersPage();
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

    public searchWithFilters(filtersData: IssuanceFilterStateInterface): void {
        this.doSearch(filtersData);
    }

    public searchRaw(): void {
        this.doSearch();
    }

    private doSearch(filters?: IssuanceFilterStateInterface): void {
        this.search.search(this.searchNeedle, filters).pipe(tap(
            () => this.searchResultTitle = this.searchNeedle
        )).subscribe(
            data => this.searchResult = [data]
        );
    }

    private subscribeToFiltersPage(): void {
        FiltersPage.filtersChanged.pipe(filter(data => null !== data)).subscribe(
            (data: IssuanceFilterStateInterface) => this.searchWithFilters(data)
        );
    }
}
