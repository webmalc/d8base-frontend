import { Injectable } from '@angular/core';
import { Country } from '@app/api/models';
import { LocationService } from '@app/api/services';
import { ApiCache } from '@app/core/abstract/api-cache.service';

@Injectable({
  providedIn: 'root',
})
export class CountriesApiCache extends ApiCache<Country> {
  constructor(private readonly locationService: LocationService) {
    super();
  }

  protected read = id => this.locationService.locationCountriesRead(id);
}
