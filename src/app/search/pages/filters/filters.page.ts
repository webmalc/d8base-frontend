import {Location} from '@angular/common';
import {Component} from '@angular/core';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.page.html',
    styleUrls: ['./filters.page.scss']
})
export class FiltersPage {

    constructor(private readonly location: Location) {
    }

    public onFiltersSubmit(): void {
        this.location.back();
    }
}
