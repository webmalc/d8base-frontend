import {Location} from '@angular/common';
import {Component} from '@angular/core';
import {IssuanceFilterStateInterface} from '@app/issuance/interfaces/issuance-filter-state-interface';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.page.html',
    styleUrls: ['./filters.page.scss']
})
export class FiltersPage {

    public static filtersChanged: BehaviorSubject<IssuanceFilterStateInterface | null>
        = new BehaviorSubject<IssuanceFilterStateInterface | null>(null);

    constructor(private readonly location: Location) {
    }

    public onFiltersSubmit(data: IssuanceFilterStateInterface): void {
        FiltersPage.filtersChanged.next(data);
        this.location.back();
    }
}
