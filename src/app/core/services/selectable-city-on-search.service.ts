import { Injectable } from '@angular/core';
import {SelectableSearchService} from '@app/core/services/selectable-search.service';
import {Country} from '@app/profile/models/country';
import {CitiesApiService} from '@app/profile/services/cities-api.service';
import {IonicSelectableComponent} from 'ionic-selectable';

@Injectable({
    providedIn: 'root'
})
export class SelectableCityOnSearchService extends SelectableSearchService {

    constructor(public citiesApi: CitiesApiService) {
        super();
    }

    public onCitySearch(event: { component: IonicSelectableComponent, text: string }, countryValue: Country): void {
        this.abstractOnSearch(
            event.component,
            event.text,
            this.citiesApi,
            {by_name: event.text, country: countryValue?.id.toString(10)}
        );
    }
}
