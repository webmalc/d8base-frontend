import {ChangeDetectorRef, Component, EventEmitter, Output} from '@angular/core';
import {SearchFiltersSubmenu} from '@app/search/enums/search-filters-submenu';
import {SearchFilterStateInterface} from '@app/search/interfaces/search-filter-state-interface';
import {SearchFilterStateService} from '@app/search/services/search-filter-state.service';

@Component({
    selector: 'app-search-filters',
    templateUrl: './search-filters.component.html',
    styleUrls: ['./search-filters.component.scss']
})
export class SearchFiltersComponent {

    public defaultTab: string = SearchFiltersSubmenu.Main;
    public tabs = SearchFiltersSubmenu;
    public tab: string = this.defaultTab;
    @Output() public filtersData: EventEmitter<SearchFilterStateInterface> = new EventEmitter<SearchFilterStateInterface>();

    constructor(public readonly filtersStateManager: SearchFilterStateService, private readonly cd: ChangeDetectorRef) {
    }

    public submitFilters(): void {
        this.filtersData.emit(this.filtersStateManager.data);
    }

    public setTab(tab: string): void {
        this.tab = tab;
    }

    public resetFilters(): void {
        this.filtersStateManager.clear();
        this.cd.detectChanges();
    }
}
