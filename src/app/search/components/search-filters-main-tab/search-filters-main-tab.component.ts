import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Category, City, Country, Rate, Subcategory } from '@app/api/models';
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
import { BehaviorSubject, forkJoin } from 'rxjs';
import { filter, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-search-filters-main-tab',
  templateUrl: './search-filters-main-tab.component.html',
  styleUrls: ['./search-filters-main-tab.component.scss'],
  providers: [NgDestroyService],
})
export class SearchFiltersMainTabComponent implements OnInit {
  public countries$ = this.countriesApi.list();
  public categoryList$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  public subcategoriesList$: BehaviorSubject<Subcategory[]> = new BehaviorSubject<Subcategory[]>([]);
  public rates: Rate[] = [];

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
  ) {}

  public ngOnInit(): void {
    this.subscribeCategories();
    this.subscribeRates();
  }

  public async initLocationPopover(): Promise<void> {
    const pop = await this.pop.create({
      component: OnMapPopoverComponent,
      translucent: true,
      animated: true,
      componentProps: {
        data: {
          coordinates: this.stateManager.searchForm.get('location').get('coordinates'),
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

  public onCityChange(event: { value: City }): void {
    const country: Country | null = this.getCountryValue();
    this.currentLocation
      .getCoords(country, event.value)
      .pipe(filter(data => null !== data))
      .subscribe(res => {
        this.stateManager.searchForm.get('location').setValue({
          country,
          city: event.value,
          coordinates: res,
        });
      });
  }

  public getCountryValue(): Country | null {
    return this.stateManager.searchForm.get('location').get('country').value;
  }

  public onCountryChange(): void {
    this.stateManager.searchForm.get('location').get('city').reset();
  }

  public initSubcategories(categories: Category[]): void {
    forkJoin(categories.map(c => this.professionalsApi.professionalsSubcategoriesRead(c.id))).subscribe(data =>
      this.subcategoriesList$.next(data),
    );
  }

  private updateCity(coords: Coords): void {
    this.currentLocation
      .getExtendedLocationByCoords(coords)
      .pipe(filter(res => null !== res))
      .subscribe(res => {
        this.stateManager.searchForm.get('location').setValue({
          country: res.country,
          city: res.city,
          coordinates: res.coords,
        });
      });
  }

  private subscribeCategories(): void {
    this.professionalsApi
      .professionalsCategoriesList({})
      .subscribe(results => this.categoryList$.next(results.results));
  }

  private subscribeRates(): void {
    this.ratesApiCache
      .list()
      .pipe(withLatestFrom(this.userSettings.userSettings$))
      .subscribe(([rates, settings]) => {
        this.rates = rates;
        this.stateManager.searchForm
          .get('price')
          .get('currency')
          .setValue(rates.find(({ currency }) => currency === settings?.currency ?? rates[0].currency));
        this.cd.markForCheck();
      });
  }
}
