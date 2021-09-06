import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Category, Subcategory } from '@app/api/models';
import { ProfessionalsService } from '@app/api/services';
import { ResolvedUserLocation } from '@app/core/interfaces/user-location.interface';
import { NgDestroyService, SearchQueryService } from '@app/core/services';
import { SearchFilterStateService } from '@app/core/services/search/search-filter-state.service';
import { SearchFilterFormControls } from '@app/search/interfaces/search-filter-form-value.interface';
import { forkJoin, Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-basic-filters',
  templateUrl: './basic-filters.component.html',
  styleUrls: ['./basic-filters.component.scss'],
  providers: [NgDestroyService],
})
export class BasicFiltersComponent implements OnInit {
  public categoryList$: Observable<Category[]> = this.professionalsApi
    .professionalsCategoriesList({})
    .pipe(map(({ results }) => results));
  public subcategoriesList: Subcategory[];

  public get controls(): SearchFilterFormControls {
    return this.stateManager.controls;
  }

  public get form(): FormGroup {
    return this.stateManager.form;
  }

  constructor(
    private readonly professionalsApi: ProfessionalsService,
    public readonly stateManager: SearchFilterStateService,
    private readonly filtersStateManager: SearchFilterStateService,
    private readonly query: SearchQueryService,
    private readonly cd: ChangeDetectorRef,
    private readonly destroy$: NgDestroyService,
  ) {}

  public ngOnInit(): void {
    this.detectChangesForIonicSelectable();
  }

  public initSubcategories(categories: Category[]): void {
    this.subcategoriesList = null;
    this.controls.subcategory.reset();
    forkJoin(categories.map(c => this.professionalsApi.professionalsSubcategoriesList({ category: c.id })))
      .pipe(takeUntil(this.destroy$))
      .subscribe(subcategoriesList => {
        this.subcategoriesList = subcategoriesList.reduce((all, v) => all.concat(v.results), []);
        this.cd.detectChanges();
      });
  }

  public updateLocation(location: ResolvedUserLocation): void {
    this.stateManager.updateLocation(location);
  }

  private detectChangesForIonicSelectable(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.cd.detectChanges();
    });
  }
}
