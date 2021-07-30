import { Injectable } from '@angular/core';
import { Subregion } from '@app/api/models';
import { LocationService } from '@app/api/services';
import { ApiCache } from '@app/core/abstract/api-cache.service';
import { Observable } from 'rxjs';

@Injectable()
export class SubregionsApiCache extends ApiCache<Subregion> {
  constructor(private readonly locationService: LocationService) {
    super();
  }

  protected read(id: number): Observable<Subregion> {
    return this.locationService.locationSubregionsRead(id);
  }
}
