import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Category, Rate, Subcategory } from '@app/api/models';
import { ProfessionalsService } from '@app/api/services';
import { NgDestroyService } from '@app/core/services';
import { CountriesApiCache, RatesApiCache } from '@app/core/services/cache';
import { CurrentLocationCompilerService } from '@app/core/services/location/current-location-compiler.service';
import { OnMapPopoverComponent } from '@app/main/components/on-map-popover/on-map-popover.component';
import { SearchFilterStateService } from '@app/search/services/search-filter-state.service';
import { Coords } from '@app/shared/interfaces/coords';
import { SelectableCityOnSearchService } from '@app/shared/services/selectable-city-on-search.service';
import { UserSettingsService } from '@app/shared/services/user-settings.service';
import { PopoverController } from '@ionic/angular';
import { forkJoin, Observable } from 'rxjs';
import { filter, map, takeUntil, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-search-filters-main-tab',
  templateUrl: './search-filters-main-tab.component.html',
  styleUrls: ['./search-filters-main-tab.component.scss'],
  providers: [NgDestroyService],
})
export class SearchFiltersMainTabComponent implements OnInit {
  public countries$ = this.countriesApi.list();
  public categoryList$: Observable<Category[]> = this.professionalsApi
    .professionalsCategoriesList({})
    .pipe(map(({ results }) => results));
  public subcategoriesList: Subcategory[];
  public rates: Rate[] = [];

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
    private readonly countriesApi: CountriesApiCache,
    private readonly professionalsApi: ProfessionalsService,
    public readonly stateManager: SearchFilterStateService,
    public readonly citySelectable: SelectableCityOnSearchService,
    private readonly pop: PopoverController,
    private readonly currentLocation: CurrentLocationCompilerService,
    private readonly ratesApiCache: RatesApiCache,
    private readonly userSettings: UserSettingsService,
    private readonly cd: ChangeDetectorRef,
    private readonly destroy$: NgDestroyService,
  ) {}

  public ngOnInit(): void {
    this.subscribeRates();
    this.detectChangesForIonicSelectable();
  }

  public async initLocationPopover(): Promise<void> {
    const pop = await this.pop.create({
      component: OnMapPopoverComponent,
      translucent: true,
      animated: true,
      componentProps: {
        data: {
          coordinates: this.form.get([this.formGroups.location, this.formFields.location.coordinates]),
        },
        renderCountry: false,
      },
      cssClass: ['map-popover-width', 'map-popover-height'],
    });
    pop.onDidDismiss().then((data: { data: { coordinates: Coords } }) => {
      if (data.data?.coordinates) {
        this.updateCity(data.data.coordinates);
      }
    });

    return await pop.present();
  }

  public onCountryChange(): void {
    this.form.get([this.formGroups.location, this.formFields.location.city]).reset();
  }

  public initSubcategories(categories: Category[]): void {
    this.subcategoriesList = null;
    this.form.get(this.formFields.subcategory).reset();
    forkJoin(categories.map(c => this.professionalsApi.professionalsSubcategoriesRead(c.id)))
      .pipe(takeUntil(this.destroy$))
      .subscribe(subcategoriesList => {
        this.subcategoriesList = subcategoriesList;
        this.cd.detectChanges();
      });
  }

  private updateCity(coords: Coords): void {
    this.currentLocation
      .getExtendedLocationByCoords(coords)
      .pipe(
        filter(res => null !== res),
        takeUntil(this.destroy$),
      )
      .subscribe(res => {
        this.form.get(this.formGroups.location).setValue({
          country: res.country,
          city: res.city,
          coordinates: res.coords,
        });
      });
  }

  private subscribeRates(): void {
    this.ratesApiCache
      .list()
      .pipe(withLatestFrom(this.userSettings.userSettings$), takeUntil(this.destroy$))
      .subscribe(([rates, settings]) => {
        this.rates = rates;
        this.form
          .get([this.formGroups.price, this.formFields.price.currency])
          .setValue(rates.find(({ currency }) => currency === settings?.currency ?? rates[0].currency));
        this.cd.markForCheck();
      });
  }

  private detectChangesForIonicSelectable(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.cd.detectChanges();
    });
  }
}
