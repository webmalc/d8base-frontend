import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Category, City, Country, Rate, Subcategory, UserLocation } from '@app/api/models';
import { ProfessionalsService } from '@app/api/services';
import { NgDestroyService } from '@app/core/services';
import { CountriesApiCache, RatesApiCache } from '@app/core/services/cache';
import { CurrentLocationCompilerService } from '@app/core/services/location/current-location-compiler.service';
import { FullLocationService } from '@app/core/services/location/full-location.service';
import { OnMapPopoverComponent } from '@app/main/components/on-map-popover/on-map-popover.component';
import { SearchLocationDataInterface } from '@app/main/interfaces/search-location-data-interface';
import { SearchFilterStateService } from '@app/search/services/search-filter-state.service';
import { Coords } from '@app/shared/interfaces/coords';
import { SelectableCityOnSearchService } from '@app/shared/services/selectable-city-on-search.service';
import { UserSettingsService } from '@app/shared/services/user-settings.service';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { PopoverController } from '@ionic/angular';
import { Select } from '@ngxs/store';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { filter, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-search-filters-main-tab',
  templateUrl: './search-filters-main-tab.component.html',
  styleUrls: ['./search-filters-main-tab.component.scss'],
  providers: [NgDestroyService],
})
export class SearchFiltersMainTabComponent implements OnInit {
  @Select(CurrentUserSelectors.defaultLocation)
  public defaultLocation$: Observable<UserLocation>;

  public countries$ = this.countriesApi.list();
  public categoryList$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  public subcategoriesList$: BehaviorSubject<Subcategory[]> = new BehaviorSubject<Subcategory[]>([]);
  public rates: Rate[] = [];

  constructor(
    private readonly fullLocationService: FullLocationService,
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
    this.subscribeCategories();
    this.subscribeRates();
    this.subscribeLocationFromUserProfile();
  }

  public async initLocationPopover(): Promise<void> {
    const pop = await this.pop.create({
      component: OnMapPopoverComponent,
      translucent: true,
      animated: true,
      componentProps: {
        data: {
          coordinates: this.stateManager.data.location.coordinates,
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
          (this.stateManager.data.location = {
            country,
            city: event.value,
            coordinates: res,
          }),
      );
  }

  public getCountryValue(): Country | null {
    return this.stateManager.data.location.country;
  }

  public onCountryChange(): void {
    this.stateManager.data.location.city = undefined;
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
      .subscribe(
        res =>
          (this.stateManager.data.location = {
            country: res.country,
            city: res.city,
            coordinates: res.coords,
          }),
      );
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
        this.stateManager.data.price.currency = rates.find(
          ({ currency }) => currency === settings?.currency ?? rates[0].currency,
        );
        this.cd.markForCheck();
      });
  }

  private subscribeLocationFromUserProfile(): void {
    this.defaultLocation$
      .pipe(
        filter(defaultLocation => Boolean(defaultLocation)),
        switchMap(defaultLocation => this.fullLocationService.getFullLocation(defaultLocation)),
        takeUntil(this.destroy$),
      )
      .subscribe(fullLocation => {
        const locationData: SearchLocationDataInterface = {
          country: fullLocation.country,
          city: fullLocation.city,
          coordinates: null,
        };
        this.stateManager.setLocationData(locationData);
        setTimeout(() => {
          this.cd.detectChanges();
        }, 0);
        this.cd.markForCheck();
      });
  }
}
