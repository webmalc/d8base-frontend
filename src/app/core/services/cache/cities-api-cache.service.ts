import { Injectable } from '@angular/core';
import { City } from '@app/api/models';
import { LocationService } from '@app/api/services';
import { ApiCache } from '@app/core/abstract/api-cache.service';
import { Observable } from 'rxjs';

@Injectable()
export class CitiesApiCache extends ApiCache<City> {
  constructor(private readonly locationService: LocationService) {
    super();
  }

  protected read(id: number): Observable<City> {
    return this.locationService.locationCitiesRead(id);
  }
}
