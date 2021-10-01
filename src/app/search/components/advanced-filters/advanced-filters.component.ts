import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProfessionalList, Rate } from '@app/api/models';
import { professionalLevels } from '@app/core/constants/professional.constants';
import { NgDestroyService } from '@app/core/services';
import { CountriesApiCache, RatesApiCache, LanguagesApiCache } from '@app/core/services/cache';
import { SearchFilterStateService } from '@app/core/services/search/search-filter-state.service';
import { SearchFilterFormControls } from '@app/search/interfaces/search-filter-form-value.interface';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-advanced-filters',
  templateUrl: './advanced-filters.component.html',
  styleUrls: ['./advanced-filters.component.scss'],
  providers: [NgDestroyService],
})
export class AdvancedFiltersComponent implements OnInit {
  public readonly languages$ = this.languagesApiCache.list();

  public readonly professionalLevels: {
    value: ProfessionalList['level'];
  }[] = professionalLevels.map((value: ProfessionalList['level']) => ({ value }));

  public readonly paymentMethods: {
    value: string;
  }[] = ['cash', 'online'].map(value => ({ value }));

  public readonly rates$: Observable<Rate[]> = this.ratesApiCache.list();

  constructor(
    private readonly countriesApiCache: CountriesApiCache,
    private readonly stateManager: SearchFilterStateService,
    private readonly languagesApiCache: LanguagesApiCache,
    private readonly ratesApiCache: RatesApiCache,
    private readonly translate: TranslateService,
    private readonly cd: ChangeDetectorRef,
    private readonly destroy$: NgDestroyService,
  ) {}

  public get controls(): SearchFilterFormControls {
    return this.stateManager.controls;
  }

  public get form(): FormGroup {
    return this.stateManager.form;
  }

  public ngOnInit(): void {
    this.detectChangesForIonicSelectable();
  }

  private detectChangesForIonicSelectable(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.cd.detectChanges();
    });
  }
}
