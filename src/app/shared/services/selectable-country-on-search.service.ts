import { Injectable } from '@angular/core';
import {CountriesApiService} from '@app/profile/services/countries-api.service';
import {SelectableSearchService} from '@app/shared/abstract/selectable-search.service';
import {IonicSelectableComponent} from 'ionic-selectable';

@Injectable()
export class SelectableCountryOnSearchService extends SelectableSearchService {

    constructor(public countriesApi: CountriesApiService) {
        super();
    }

    public onCountrySearch(event: { component: IonicSelectableComponent, text: string }): void {
        this.abstractOnSearch(event.component, event.text, this.countriesApi, {search: event.text});
    }
}
