import {Location} from '@angular/common';
import {Component} from '@angular/core';
import {SearchFilterStateInterface} from '@app/search/interfaces/search-filter-state-interface';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.page.html',
    styleUrls: ['./filters.page.scss']
})
export class FiltersPage {

    public static filtersChanged: BehaviorSubject<SearchFilterStateInterface | null>
        = new BehaviorSubject<SearchFilterStateInterface | null>(null);

    constructor(private readonly location: Location) {
    }

    public onFiltersSubmit(data: SearchFilterStateInterface): void {
        FiltersPage.filtersChanged.next(data);
        this.location.back();
    }
}
