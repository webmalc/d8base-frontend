import { Injectable } from '@angular/core';
import { CitiesApiService } from '@app/core/services/location/cities-api.service';
import { Country } from '@app/api/models';
import { SelectableSearchService } from '@app/shared/abstract/selectable-search.service';
import { IonicSelectableComponent } from 'ionic-selectable';

@Injectable()
export class SelectableCityOnSearchService extends SelectableSearchService {

  constructor(public citiesApi: CitiesApiService) {
    super();
  }

  public onCitySearch(event: { component: IonicSelectableComponent; text: string }, countryValue: Country): void {
    this.abstractOnSearch(
      event.component,
      event.text,
      this.citiesApi,
      { by_name: event.text, country: countryValue?.id.toString(10) },
    );
  }
}
