import { Injectable } from '@angular/core';
import {Region} from '@app/core/models/region';
import {RegionApiService} from '@app/core/services/location/region-api.service';
import {SelectableSearchService} from '@app/core/services/selectable-search.service';
import {IonicSelectableComponent} from 'ionic-selectable';

@Injectable({
    providedIn: 'root'
})
export class SelectableRegionOnSearchService extends SelectableSearchService {

    constructor(private regionApi: RegionApiService) {
        super();
    }

    public onRegionSearch(event: { component: IonicSelectableComponent, text: string }, region: Region): void {
        this.abstractOnSearch(
            event.component,
            event.text,
            this.regionApi,
            {country: region?.id.toString(10)}
        );
    }
}
