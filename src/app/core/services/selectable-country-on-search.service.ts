import { Injectable } from '@angular/core';
import {SelectableSearchService} from '@app/core/services/selectable-search.service';
import {CountriesApiService} from '@app/profile/services/countries-api.service';
import {IonicSelectableComponent} from 'ionic-selectable';

@Injectable({
    providedIn: 'root'
})
export class SelectableCountryOnSearchService extends SelectableSearchService {

    constructor(public countriesApi: CountriesApiService) {
        super();
    }

    public onCountrySearch(event: { component: IonicSelectableComponent, text: string }): void {
        this.abstractOnSearch(event.component, event.text, this.countriesApi, {search: event.text});
    }
}
