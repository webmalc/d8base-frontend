import { Component, OnInit } from '@angular/core';
import { Category, UserLocation } from '@app/api/models';
import { ResolvedUserLocation } from '@app/core/interfaces/user-location.interface';
import { NgDestroyService } from '@app/core/services';
import { DefaultCategoriesFactoryService } from '@app/main/services/default-categories-factory.service';
import { SearchFilterStateConverter } from '@app/search/services/search-filter-state-converter.service';
import { SearchFilterStateService } from '@app/search/services/search-filter-state.service';
import { SearchQueryService } from '@app/search/services/search-query.service';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import UserLocationSelectors from '@app/store/current-user/user-locations/user-locations.selectors';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, switchMap, takeUntil } from 'rxjs/operators';
import { convertCategoryCodeToFaIconCode } from './enums/default-category-list';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  providers: [NgDestroyService],
})
export class MainPage implements OnInit {
  @Select(UserLocationSelectors.defaultLocation)
  public defaultLocation$: Observable<UserLocation>;
  @Select(CurrentUserSelectors.language)
  public language$: Observable<string>;

  public defaultCategories$: Observable<Category[]>;

  public locationEnabled = false;

  constructor(
    private readonly defaultCategory: DefaultCategoriesFactoryService,
    public readonly stateManager: SearchFilterStateService,
    public readonly query: SearchQueryService,
    private readonly destroy$: NgDestroyService,
    private readonly searchFilterStateConverter: SearchFilterStateConverter,
  ) {}

  public get formFields() {
    return this.stateManager.formFields;
  }

  public get formGroups() {
    return this.stateManager.formGroups;
  }

  public get form() {
    return this.stateManager.searchForm;
  }

  public ngOnInit(): void {
    this.defaultLocation$
      .pipe(
        switchMap(params => this.searchFilterStateConverter.getSearchFilterState(params)),
        takeUntil(this.destroy$),
      )
      .subscribe(data => {
        if (data) {
          this.form.get(this.formGroups.location).patchValue(data.location);
        }
        this.locationEnabled = true;
      });

    this.initDefaultCategories();
  }

  public searchByCategory(category: Category): void {
    this.form.get(this.formFields.category).setValue([category]);
    this.search();
  }

  public initDefaultCategories(): void {
    this.defaultCategories$ = this.language$.pipe(
      filter(language => Boolean(language)),
      distinctUntilChanged(),
      switchMap(() => this.defaultCategory.getList()),
      map(categories =>
        categories.map(category => ({ ...category, code: convertCategoryCodeToFaIconCode(category.code) })),
      ),
      shareReplay(1),
    );
  }

  public updateLocation(location: ResolvedUserLocation): void {
    if (location) {
      this.form.controls[this.formGroups.location].setValue({
        country: location.country,
        city: location.city,
        coordinates: null,
      });
    }
  }

  public search(): void {
    this.query.searchByFormValue(this.stateManager.searchForm.value);
  }
}
