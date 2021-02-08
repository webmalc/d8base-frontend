import { Component } from '@angular/core';
import { LocationService } from '@app/api/services';
import { SearchFilterStateService } from '@app/search/services/search-filter-state.service';
import { SelectableCountryOnSearchService } from '@app/shared/services/selectable-country-on-search.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-search-filters-additional-tab',
  templateUrl: './search-filters-additional-tab.component.html',
  styleUrls: ['./search-filters-additional-tab.component.scss'],
})
export class SearchFiltersAdditionalTabComponent {
  public readonly languages$ = this.locationService.locationLanguagesList();
  public readonly professionalLevels: { value: string; name: string }[] = ['junior', 'middle', 'senior'].map(value => ({
    value,
    name: this.translate.instant(`global.professional-level.${value}`),
  }));
  public readonly paymentMethods: { value: string; name: string }[] = ['cash', 'online'].map(value => ({
    value,
    name: this.translate.instant(`service-payment-options.${value}`),
  }));
  constructor(
    public readonly countrySelectable: SelectableCountryOnSearchService,
    public readonly stateManager: SearchFilterStateService,
    public readonly locationService: LocationService,
    private readonly translate: TranslateService,
  ) {}
}
