import { Pipe } from '@angular/core';
import { Service } from '@app/api/models';
import { ServicesApiCache } from '@app/core/services/cache';
import { EntityById } from '@app/shared/pipes/entity-by-id';

@Pipe({
  name: 'serviceById$',
})
export class ServiceByIdPipe extends EntityById<Service> {
  constructor(servicesCache: ServicesApiCache) {
    super();
    this.entityCache = servicesCache;
  }
}
