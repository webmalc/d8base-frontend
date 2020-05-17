import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {LocationTypes} from '@app/core/types/location-types';
import {City} from '@app/profile/models/city';
import {Country} from '@app/profile/models/country';
import {CitiesApiService} from '@app/profile/services/cities-api.service';
import {CountriesApiService} from '@app/profile/services/countries-api.service';
import {IonicSelectableComponent} from 'ionic-selectable';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';

export abstract class CountryCitySelectTrait {

    public countryList$: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>([]);
    public citiesList$: BehaviorSubject<City[]> = new BehaviorSubject<City[]>([]);
    protected searchSubscription: Subscription = null;

    public onCitySearch(event: { component: IonicSelectableComponent, text: string }): void {
        const country: Country = this.getFormService().getFormFieldValue(this.getCountyFormField());
        this.abstractOnSearch(
            event.component,
            event.text,
            this.getCitiesApiService(),
            {by_name: event.text, country: country?.id.toString(10)}
        );
    }

    public onCountrySearch(event: { component: IonicSelectableComponent, text: string }): void {
        this.abstractOnSearch(event.component, event.text, this.getCountriesApiService(), {search: event.text});
    }

    protected abstract getFormService(): {getFormFieldValue(formField: string): any};
    protected abstract getCitiesApiService(): CitiesApiService;
    protected abstract getCountriesApiService(): CountriesApiService;
    protected abstract getCountyFormField(): string;


    protected abstractOnSearch(
        component: IonicSelectableComponent,
        text: string,
        apiService: { getList: (params: object) => Observable<ApiListResponseInterface<LocationTypes>> },
        apiParams: object
    ): void {
        component.startSearch();

        if (this.searchSubscription) {
            this.searchSubscription.unsubscribe();
        }

        if (3 > text.length) {
            if (!text) {
                component.items = [];
            }
            component.endSearch();

            return;
        }

        this.searchSubscription = apiService.getList(apiParams).subscribe(
            (data: ApiListResponseInterface<LocationTypes>) => {
                if (this.searchSubscription.closed) {
                    return;
                }

                component.items = data.results;
                component.endSearch();
            }
        );
    }
}
