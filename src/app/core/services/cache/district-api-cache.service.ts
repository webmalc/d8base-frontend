import { Injectable } from '@angular/core';
import { District } from '@app/api/models';
import { LocationService } from '@app/api/services';
import { ApiCache } from '@app/core/abstract/api-cache.service';
import { Observable } from 'rxjs';

@Injectable()
export class DistrictsApiCache extends ApiCache<District> {
  constructor(private readonly locationService: LocationService) {
    super();
  }

  protected read(id: number): Observable<District> {
    return this.locationService.locationDistrictsRead(id);
  }
}
