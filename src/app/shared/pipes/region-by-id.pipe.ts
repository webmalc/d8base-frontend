import { Pipe } from '@angular/core';
import { Region } from '@app/api/models';
import { RegionsApiCache } from '@app/core/services/cache';
import { EntityById } from './entity-by-id';

@Pipe({
  name: 'regionById$',
})
export class RegionByIdPipe extends EntityById<Region> {
  constructor(regionsCache: RegionsApiCache) {
    super();
    this.entityCache = regionsCache;
  }
}
