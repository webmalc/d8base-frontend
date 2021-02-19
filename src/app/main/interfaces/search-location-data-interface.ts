import { City, Country } from '@app/api/models';
import { Coords } from '@app/shared/interfaces/coords';

export interface SearchLocationDataInterface {
  country: Country;
  city: City;
  coordinates: Coords;
}
