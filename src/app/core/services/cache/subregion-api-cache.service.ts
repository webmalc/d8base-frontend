import { Injectable } from '@angular/core';
import { Subregion } from '@app/api/models';
import { LocationService } from '@app/api/services';
import { ApiCache } from '@app/core/abstract/api-cache.service';

@Injectable({
  providedIn: 'root',
})
export class SubregionsApiCache extends ApiCache<Subregion> {
  protected read = this.locationService.locationSubregionsRead;

  constructor(private readonly locationService: LocationService) {
    super();
  }
}
