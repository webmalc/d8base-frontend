import { Pipe } from '@angular/core';
import { Country } from '@app/api/models';
import { CountriesApiCache } from '@app/core/services/cache';
import { EntityById } from './entity-by-id';

@Pipe({
  name: 'countryById$',
})
export class CountryByIdPipe extends EntityById<Country> {
  constructor(countriesCache: CountriesApiCache) {
    super();
    this.entityCache = countriesCache;
  }
}
