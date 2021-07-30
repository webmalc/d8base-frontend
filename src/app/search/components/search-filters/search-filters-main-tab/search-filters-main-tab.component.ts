import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Category, Rate, Subcategory } from '@app/api/models';
import { ProfessionalsService } from '@app/api/services';
import { NgDestroyService } from '@app/core/services';
import { RatesApiCache } from '@app/core/services/cache';
import { SearchFilterStateService } from '@app/core/services/search/search-filter-state.service';
import { forkJoin, Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search-filters-main-tab',
  templateUrl: './search-filters-main-tab.component.html',
  styleUrls: ['./search-filters-main-tab.component.scss'],
  providers: [NgDestroyService],
})
export class SearchFiltersMainTabComponent implements OnInit {
  public categoryList$: Observable<Category[]> = this.professionalsApi
    .professionalsCategoriesList({})
    .pipe(map(({ results }) => results));
  public subcategoriesList: Subcategory[];
  public rates$: Observable<Rate[]> = this.ratesApiCache.list();

  public get formFields() {
    return this.stateManager.formFields;
  }

  public get form() {
    return this.stateManager.searchForm;
  }

  constructor(
    private readonly professionalsApi: ProfessionalsService,
    public readonly stateManager: SearchFilterStateService,
    private readonly ratesApiCache: RatesApiCache,
    private readonly cd: ChangeDetectorRef,
    private readonly destroy$: NgDestroyService,
  ) {}

  public ngOnInit(): void {
    this.detectChangesForIonicSelectable();
  }

  public initSubcategories(categories: Category[]): void {
    this.subcategoriesList = null;
    this.form.get(this.formFields.subcategory).reset();
    forkJoin(categories.map(c => this.professionalsApi.professionalsSubcategoriesList({ category: c.id })))
      .pipe(takeUntil(this.destroy$))
      .subscribe(subcategoriesList => {
        this.subcategoriesList = subcategoriesList.reduce((all, v) => all.concat(v.results), []);
        this.cd.detectChanges();
      });
  }

  private detectChangesForIonicSelectable(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.cd.detectChanges();
    });
  }
}
