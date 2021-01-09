import { City } from '@app/profile/models/city';
import { Country } from '@app/profile/models/country';
import { Coords } from '@app/shared/interfaces/coords';

export interface SearchLocationDataInterface {
    country: Country;
    city: City;
    coordinates: Coords;
}
