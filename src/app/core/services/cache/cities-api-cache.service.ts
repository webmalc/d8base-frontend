import { Injectable } from '@angular/core';
import { City } from '@app/api/models';
import { LocationService } from '@app/api/services';
import { ApiCache } from '@app/core/abstract/api-cache.service';

@Injectable({
  providedIn: 'root',
})
export class CitiesApiCache extends ApiCache<City> {
  protected read = this.locationService.locationCitesRead;

  constructor(private readonly locationService: LocationService) {
    super();
  }
}
