import { Injectable } from '@angular/core';
import { PostalCode } from '@app/api/models';
import { LocationService } from '@app/api/services';
import { ApiCache } from '@app/core/abstract/api-cache.service';
import { Observable } from 'rxjs';

@Injectable()
export class PostalCodeApiCache extends ApiCache<PostalCode> {
  constructor(private readonly locationService: LocationService) {
    super();
  }

  protected read(id): Observable<PostalCode> {
    return this.locationService.locationPostalCodesRead(id);
  }
}
