import { Injectable } from '@angular/core';
import {Region} from '@app/core/models/region';
import {SubregionApiService} from '@app/core/services/location/subregion-api.service';
import {SelectableSearchService} from '@app/core/services/selectable-search.service';
import {Country} from '@app/profile/models/country';
import {IonicSelectableComponent} from 'ionic-selectable';

@Injectable({
    providedIn: 'root'
})
export class SelectableSubregionOnSearchService extends SelectableSearchService {

    constructor(private subregionApi: SubregionApiService) {
        super();
    }

    public onSubregionSearch(event: { component: IonicSelectableComponent, text: string }, country: Country, region: Region): void {
        this.abstractOnSearch(
            event.component,
            event.text,
            this.subregionApi,
            {country: country?.id.toString(10), region: region?.id.toString(10)}
        );
    }
}
