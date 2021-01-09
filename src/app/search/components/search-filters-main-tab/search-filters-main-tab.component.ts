import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Category } from '@app/core/models/category';
import { Currency } from '@app/core/models/currency';
import { Subcategory } from '@app/core/models/subcategory';
import { CategoriesApiService } from '@app/core/services/categories-api.service';
import { CurrencyListApiService } from '@app/core/services/currency-list-api.service';
import { CurrentLocationCompilerService } from '@app/core/services/location/current-location-compiler.service';
import { SubcategoriesApiService } from '@app/core/services/subcategories-api.service';
import { OnMapPopoverComponent } from '@app/main/components/on-map-popover/on-map-popover.component';
import { City } from '@app/profile/models/city';
import { Country } from '@app/profile/models/country';
import { SearchFilterStateService } from '@app/search/services/search-filter-state.service';
import { Coords } from '@app/shared/interfaces/coords';
import { SelectableCityOnSearchService } from '@app/shared/services/selectable-city-on-search.service';
import { SelectableCountryOnSearchService } from '@app/shared/services/selectable-country-on-search.service';
import { UserSettingsService } from '@app/shared/services/user-settings.service';
import { PopoverController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
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
        private readonly subcategoriesApi: SubcategoriesApiService,
        private readonly categoriesApi: CategoriesApiService,
        public readonly stateManager: SearchFilterStateService,
        public readonly countrySelectable: SelectableCountryOnSearchService,
        public readonly citySelectable: SelectableCityOnSearchService,
        private readonly pop: PopoverController,
        private readonly currentLocation: CurrentLocationCompilerService,
        private readonly currencyListApi: CurrencyListApiService,
        private readonly userSettings: UserSettingsService,
        private readonly cd: ChangeDetectorRef,
    ) { }

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

    public initSubcategories(cat: Category[]): void {
        this.subcategoriesApi.getListByCategoryId(cat).subscribe(data => this.subcategoriesList$.next(data));
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
        this.categoriesApi.get().subscribe(results => this.categoryList$.next(results.results));
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
