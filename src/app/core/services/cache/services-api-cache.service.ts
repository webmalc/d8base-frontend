import { Injectable } from '@angular/core';
import { Service } from '@app/api/models';
import { ServicesService } from '@app/api/services';
import { ApiCache } from '@app/core/abstract/api-cache.service';

@Injectable()
export class ServicesApiCache extends ApiCache<Service> {
  protected read = this.servicesService.servicesServicesRead;

  constructor(private readonly servicesService: ServicesService) {
    super();
  }
}
