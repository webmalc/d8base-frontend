import { Injectable } from '@angular/core';
import { Region } from '@app/api/models';
import { LocationService } from '@app/api/services';
import { ApiCache } from '@app/core/abstract/api-cache.service';

@Injectable({
  providedIn: 'root',
})
export class RegionsApiCache extends ApiCache<Region> {
  protected read = this.locationService.locationRegionsRead;

  constructor(private readonly locationService: LocationService) {
    super();
  }
}
