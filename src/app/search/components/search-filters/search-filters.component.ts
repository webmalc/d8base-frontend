import { Component, Input } from '@angular/core';
import { SearchFiltersSubmenu } from '@app/search/components/search-filters/search-filters-submenu.enum';
import { SearchFilterStateService } from '@app/search/services/search-filter-state.service';
import { SearchQueryService } from '@app/search/services/search-query.service';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss'],
})
export class SearchFiltersComponent {
  @Input() public showBackButton: boolean = false;
  public defaultTab: string = SearchFiltersSubmenu.Main;
  public tabs = SearchFiltersSubmenu;
  public tab: string = this.defaultTab;

  constructor(
    private readonly filtersStateManager: SearchFilterStateService,
    private readonly query: SearchQueryService,
  ) {}

  public submitFilters(): void {
    this.query.searchByFormValue(this.filtersStateManager.searchForm.value);
  }

  public setTab(tab: string): void {
    this.tab = tab;
  }
}
