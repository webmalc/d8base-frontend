import { Injectable } from '@angular/core';
import {DistrictApiService} from '@app/core/services/location/district-api.service';
import {City} from '@app/profile/models/city';
import {SelectableSearchService} from '@app/shared/services/selectable-search.service';
import {IonicSelectableComponent} from 'ionic-selectable';

@Injectable()
export class SelectableDistrictOnSearchService extends SelectableSearchService {

    constructor(private districtApi: DistrictApiService) {
        super();
    }

    public onDistrictSearch(event: { component: IonicSelectableComponent, text: string }, city: City): void {
        this.abstractOnSearch(
            event.component,
            event.text,
            this.districtApi,
            {city: city?.id.toString(10)}
        );
    }
}
