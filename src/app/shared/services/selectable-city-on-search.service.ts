import { Injectable } from '@angular/core';
import {Country} from '@app/profile/models/country';
import {CitiesApiService} from '@app/profile/services/cities-api.service';
import {SelectableSearchService} from '@app/shared/abstract/selectable-search.service';
import {IonicSelectableComponent} from 'ionic-selectable';

@Injectable()
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
