import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Category, UserLocation } from '@app/api/models';
import { ResolvedUserLocation } from '@app/core/interfaces/user-location.interface';
import { NgDestroyService, PlatformService } from '@app/core/services';
import { SearchFilterStateConverter } from '@app/core/services/search/search-filter-state-converter.service';
import { SearchFilterStateService } from '@app/core/services/search/search-filter-state.service';
import { SearchQueryService } from '@app/core/services/search/search-query.service';
import { DefaultCategoriesFactoryService } from '@app/main/services/default-categories-factory.service';
import { SearchFilterFormControls } from '@app/search/interfaces/search-filter-form-value.interface';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import UserLocationSelectors from '@app/store/current-user/user-locations/user-locations.selectors';
import { Select, Store } from '@ngxs/store';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, switchMap, takeUntil } from 'rxjs/operators';

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
  public showPromo$: Observable<boolean>;

  private readonly hidePromo$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly defaultCategory: DefaultCategoriesFactoryService,
    public readonly stateManager: SearchFilterStateService,
    public readonly query: SearchQueryService,
    private readonly destroy$: NgDestroyService,
    private readonly searchFilterStateConverter: SearchFilterStateConverter,
    private readonly platform: PlatformService,
    store: Store,
  ) {
    this.showPromo$ = combineLatest([store.select(CurrentUserSelectors.isAuthenticated), this.hidePromo$]).pipe(
      map(([isAuthenticated, isHidden]) => !isAuthenticated && !isHidden),
    );
  }

  public get controls(): SearchFilterFormControls {
    return this.stateManager.controls;
  }

  public get form(): FormGroup {
    return this.stateManager.form;
  }

  public ngOnInit(): void {
    this.defaultLocation$
      .pipe(
        switchMap(userLocation => this.searchFilterStateConverter.getSearchFilterState(userLocation)),
        takeUntil(this.destroy$),
      )
      .subscribe(formValue => {
        if (formValue) {
          this.controls.country.setValue(formValue.country);
          this.controls.city.setValue(formValue.city);
        }
        this.locationEnabled = true;
      });

    this.initDefaultCategories();
  }

  public searchByCategory(category: Category): void {
    this.controls.category.setValue(category);
    this.search();
  }

  public initDefaultCategories(): void {
    this.defaultCategories$ = this.language$.pipe(
      filter(language => Boolean(language)),
      distinctUntilChanged(),
      switchMap(() => this.defaultCategory.getList()),
      shareReplay(1),
    );
  }

  public updateLocation(location: ResolvedUserLocation): void {
    this.stateManager.updateLocation(location);
  }

  public updateDate(event: CustomEvent): void {
    const value: string = event.detail.value;
    this.controls.dateFrom.setValue(value);
    this.controls.dateTo.setValue(value);
  }

  public search(): void {
    this.query.searchByFormValue(this.stateManager.form.value);
  }

  public get isDesktop(): boolean {
    return this.platform.isDesktop();
  }

  public hidePromo(): void {
    this.hidePromo$.next(true);
  }
}
