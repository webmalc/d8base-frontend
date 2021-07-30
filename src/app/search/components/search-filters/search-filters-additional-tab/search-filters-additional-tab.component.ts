import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgDestroyService } from '@app/core/services';
import { CountriesApiCache } from '@app/core/services/cache/countries-api-cache.service';
import { LanguagesApiCache } from '@app/core/services/cache/languages-api-cache.service';
import { SearchFilterStateService } from '@app/core/services/search/search-filter-state.service';
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

  public get form() {
    return this.stateManager.searchForm;
  }

  constructor(
    private readonly countriesApiCache: CountriesApiCache,
    private readonly stateManager: SearchFilterStateService,
    private readonly languagesApiCache: LanguagesApiCache,
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
