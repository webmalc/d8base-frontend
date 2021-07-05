import { Pipe } from '@angular/core';
import { City } from '@app/api/models';
import { CitiesApiCache } from '@app/core/services/cache';
import { EntityById } from './entity-by-id';

@Pipe({
  name: 'cityById$',
})
export class CityByIdPipe extends EntityById<City> {
  constructor(citiesCache: CitiesApiCache) {
    super();
    this.entityCache = citiesCache;
  }
}
