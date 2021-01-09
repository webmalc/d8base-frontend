import { Injectable } from '@angular/core';
import {Region} from '@app/core/models/region';
import {SubregionApiService} from '@app/core/services/location/subregion-api.service';
import {Country} from '@app/profile/models/country';
import {SelectableSearchService} from '@app/shared/abstract/selectable-search.service';
import {IonicSelectableComponent} from 'ionic-selectable';

@Injectable()
export class SelectableSubregionOnSearchService extends SelectableSearchService {

    constructor(private readonly subregionApi: SubregionApiService) {
        super();
    }

    public onSubregionSearch(event: { component: IonicSelectableComponent, text: string }, country: Country, region: Region): void {
        this.abstractOnSearch(
            event.component,
            event.text,
            this.subregionApi,
            {country: country?.id.toString(10), region: region?.id.toString(10)},
        );
    }
}
