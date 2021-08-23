import { Injectable } from '@angular/core';
import { Region } from '@app/api/models';
import { LocationService } from '@app/api/services';
import { ApiCache } from '@app/core/services/cache/api-cache.service';
import { Observable } from 'rxjs';

@Injectable()
export class RegionsApiCache extends ApiCache<Region> {
  constructor(private readonly locationService: LocationService) {
    super();
  }

  protected read(id: number): Observable<Region> {
    return this.locationService.locationRegionsRead(id);
  }
}
