import {Coordinates} from '@app/shared/interfaces/coordinates';

export interface ClientLocationInterface {
    id: number;
    country?: number;
    region?: number;
    subregion?: number;
    city: number;
    district: number;
    postal_code: number;
    address: string;
    coordinates: Coordinates;
    units: number;
    professional?: number;
    timezone: string;
    is_default: boolean;
}
