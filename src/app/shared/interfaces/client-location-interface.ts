import {District} from '@app/core/models/district';
import {Region} from '@app/core/models/region';
import {Subregion} from '@app/core/models/subregion';
import {City} from '@app/profile/models/city';
import {Country} from '@app/profile/models/country';
import {Coordinates} from '@app/shared/interfaces/coordinates';

export interface ClientLocationInterface {
    id: number;
    country?: number | Country;
    region?: number | Region;
    subregion?: number | Subregion;
    city: number | City;
    district: number | District;
    postal_code: number;
    address: string;
    coordinates: Coordinates;
    units: number;
    professional?: number;
    timezone: string;
    is_default: boolean;
}
