import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchFilterStateService } from '@app/search/services/search-filter-state.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.page.html',
    styleUrls: ['./filters.page.scss']
})
export class FiltersPage implements OnInit, OnDestroy {
    private readonly ngDestroy$ = new Subject<void>();
    constructor(private readonly location: Location, private readonly state: SearchFilterStateService) {}

    public ngOnInit(): void {
        this.state.doSearch$.pipe(takeUntil(this.ngDestroy$)).subscribe(() => {
            this.location.back();
        });
    }

    public ngOnDestroy(): void {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
}
