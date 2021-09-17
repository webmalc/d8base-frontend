import { Pipe } from '@angular/core';
import { Subregion } from '@app/api/models';
import { SubregionsApiCache } from '@app/core/services/cache';
import { EntityById } from './entity-by-id';

@Pipe({
  name: 'subregionById$',
})
export class SubregionByIdPipe extends EntityById<Subregion> {
  constructor(subregionsCache: SubregionsApiCache) {
    super();
    this.entityCache = subregionsCache;
  }
}
