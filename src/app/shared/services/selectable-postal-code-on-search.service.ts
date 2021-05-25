import { Injectable } from '@angular/core';
import { PostalCodeApiService } from '@app/core/services/location/postal-code-api.service';
import { City } from '@app/profile/models/city';
import { SelectableSearchService } from '@app/shared/abstract/selectable-search.service';
import { IonicSelectableComponent } from 'ionic-selectable';

@Injectable({
  providedIn: 'root',
})
export class SelectablePostalCodeOnSearchService extends SelectableSearchService {
  constructor(private readonly postalApi: PostalCodeApiService) {
    super();
  }

  public onPostalCodeSearch(event: { component: IonicSelectableComponent; text: string }, city: City): void {
    this.abstractOnSearch(event.component, event.text, this.postalApi, { city: city?.id.toString(10) });
  }
}
