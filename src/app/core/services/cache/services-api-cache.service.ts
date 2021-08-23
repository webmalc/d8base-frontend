import { Injectable } from '@angular/core';
import { Service } from '@app/api/models';
import { ServicesService } from '@app/api/services';
import { ApiCache } from '@app/core/services/cache/api-cache.service';
import { Observable } from 'rxjs';

@Injectable()
export class ServicesApiCache extends ApiCache<Service> {
  constructor(private readonly servicesService: ServicesService) {
    super();
  }

  protected read(id: number): Observable<Service> {
    return this.servicesService.servicesServicesRead(id);
  }
}
