import {City} from '@app/profile/models/city';
import {Country} from '@app/profile/models/country';
import {Coordinates} from '@app/shared/interfaces/coordinates';

export interface MainPageSearchInterface {
    needle: string;
    date: string;
    time: string;
    location: {
        coordinates: Coordinates,
        country: Country,
        city: City
    };
}
