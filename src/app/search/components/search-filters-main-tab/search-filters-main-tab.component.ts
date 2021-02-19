import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Category, City, Country, Subcategory } from '@app/api/models';
import { ProfessionalsService } from '@app/api/services';
import { Currency } from '@app/core/models/currency';
import { CurrencyListApiService } from '@app/core/services/currency-list-api.service';
import { CurrentLocationCompilerService } from '@app/core/services/location/current-location-compiler.service';
import { OnMapPopoverComponent } from '@app/main/components/on-map-popover/on-map-popover.component';
import { SearchFilterStateService } from '@app/search/services/search-filter-state.service';
import { Coords } from '@app/shared/interfaces/coords';
import { SelectableCityOnSearchService } from '@app/shared/services/selectable-city-on-search.service';
import { SelectableCountryOnSearchService } from '@app/shared/services/selectable-country-on-search.service';
import { UserSettingsService } from '@app/shared/services/user-settings.service';
import { PopoverController } from '@ionic/angular';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { filter, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-search-filters-main-tab',
  templateUrl: './search-filters-main-tab.component.html',
  styleUrls: ['./search-filters-main-tab.component.scss'],
})
export class SearchFiltersMainTabComponent implements OnInit {
  public categoryList$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  public subcategoriesList$: BehaviorSubject<Subcategory[]> = new BehaviorSubject<Subcategory[]>([]);
  public currencyList: Currency[] = [];

  constructor(
    private readonly professionalsApi: ProfessionalsService,
    public readonly stateManager: SearchFilterStateService,
    public readonly countrySelectable: SelectableCountryOnSearchService,
    public readonly citySelectable: SelectableCityOnSearchService,
    private readonly pop: PopoverController,
    private readonly currentLocation: CurrentLocationCompilerService,
    private readonly currencyListApi: CurrencyListApiService,
    private readonly userSettings: UserSettingsService,
    private readonly cd: ChangeDetectorRef,
  ) {
  }

  public ngOnInit(): void {
    this.getCategories();
    this.getCurrencies();
  }

  public async initLocationPopover(): Promise<void> {
    const pop = await this.pop.create({
      component: OnMapPopoverComponent,
      translucent: true,
      animated: true,
      componentProps: {
        data: {
          coordinates: this.stateManager.data.main.location.coordinates,
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
      .subscribe(
        res =>
          (this.stateManager.data.main.location = {
            country,
            city: event.value,
            coordinates: res,
          }),
      );
  }

  public getCountryValue(): Country | null {
    return this.stateManager.data.main.location.country;
  }

  public onCountryChange(): void {
    this.stateManager.data.main.location.city = undefined;
  }

  public initSubcategories(categories: Category[]): void {
    forkJoin(categories.map(c => this.professionalsApi.professionalsSubcategoriesRead(c.id))).pipe(
    ).subscribe(data => this.subcategoriesList$.next(data));
  }

  private updateCity(coords: Coords): void {
    this.currentLocation
      .getExtendedLocationByCoords(coords)
      .pipe(filter(res => null !== res))
      .subscribe(
        res =>
          (this.stateManager.data.main.location = {
            country: res.country,
            city: res.city,
            coordinates: res.coords,
          }),
      );
  }

  private getCategories(): void {
    this.professionalsApi.professionalsCategoriesList({}).subscribe(results => this.categoryList$.next(results.results));
  }

  private getCurrencies(): void {
    this.currencyListApi
      .getList()
      .pipe(withLatestFrom(this.userSettings.userSettings$))
      .subscribe(([currencies, settings]) => {
        this.currencyList = currencies;
        this.stateManager.data.main.price.currency = currencies.find(
          ({ currency }) => currency === settings?.currency ?? currencies[0].currency,
        );
        this.cd.markForCheck();
      });
  }
}
