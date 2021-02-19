import { Injectable } from '@angular/core';
import { District } from '@app/api/models';
import { LocationService } from '@app/api/services';
import { ApiCache } from '@app/core/abstract/api-cache.service';

@Injectable({
  providedIn: 'root',
})
export class DistrictsApiCache extends ApiCache<District> {
  protected read = this.locationService.locationDistrictsRead;

  constructor(private readonly locationService: LocationService) {
    super();
  }
}
