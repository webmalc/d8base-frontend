import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgDestroyService } from '@app/core/services';
import { LanguagesApiCache } from '@app/core/services/cache/languages-api-cache.service';
import { SearchFilterStateService } from '@app/search/services/search-filter-state.service';
import { SelectableCountryOnSearchService } from '@app/shared/services/selectable-country-on-search.service';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-search-filters-additional-tab',
  templateUrl: './search-filters-additional-tab.component.html',
  styleUrls: ['./search-filters-additional-tab.component.scss'],
  providers: [NgDestroyService],
})
export class SearchFiltersAdditionalTabComponent implements OnInit {
  public readonly languages$ = this.languagesApiCache.list();
  public readonly professionalLevels: { value: string; name: string }[] = ['junior', 'middle', 'senior'].map(value => ({
    value,
    name: this.translate.instant(`global.professional-level.${value}`),
  }));
  public readonly paymentMethods: { value: string; name: string }[] = ['cash', 'online'].map(value => ({
    value,
    name: this.translate.instant(`service-payment-options.${value}`),
  }));

  public get formFields() {
    return this.stateManager.formFields;
  }
  public get formGroups() {
    return this.stateManager.formGroups;
  }
  public get form() {
    return this.stateManager.searchForm;
  }
  constructor(
    public readonly countrySelectable: SelectableCountryOnSearchService,
    public readonly stateManager: SearchFilterStateService,
    public readonly languagesApiCache: LanguagesApiCache,
    private readonly translate: TranslateService,
    private readonly cd: ChangeDetectorRef,
    private readonly destroy$: NgDestroyService,
  ) {}

  public ngOnInit(): void {
    this.detectChangesForIonicSelectable();
  }

  private detectChangesForIonicSelectable(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.cd.detectChanges();
    });
  }
}
