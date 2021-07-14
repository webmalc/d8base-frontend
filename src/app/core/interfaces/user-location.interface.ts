import { City, Country } from '@app/api/models';

export interface ResolvedUserLocation {
  country: Country;
  city: City;
}
