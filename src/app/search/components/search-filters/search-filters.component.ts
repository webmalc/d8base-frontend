import {Component, EventEmitter, Output} from '@angular/core';
import {SearchFiltersSubmenu} from '@app/search/enums/search-filters-submenu';
import {SearchFilterStateInterface} from '@app/search/interfaces/search-filter-state-interface';
import {SearchFilterStateService} from '@app/search/services/search-filter-state.service';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-search-filters',
    templateUrl: './search-filters.component.html',
    styleUrls: ['./search-filters.component.scss']
})
export class SearchFiltersComponent {

    public defaultTab: string = SearchFiltersSubmenu.Main;
    public tab: BehaviorSubject<string> = new BehaviorSubject<string>(this.defaultTab);
    @Output() public filtersData: EventEmitter<SearchFilterStateInterface> = new EventEmitter<SearchFilterStateInterface>();

    constructor(public readonly filtersStateManager: SearchFilterStateService) {
    }

    public submitFilters(): void {
        this.filtersData.emit(this.filtersStateManager.data);
    }
}
