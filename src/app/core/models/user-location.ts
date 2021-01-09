import { Region } from '@app/core/models/region';
import { City } from '@app/profile/models/city';
import { Country } from '@app/profile/models/country';
import { ClientLocationInterface } from '@app/shared/interfaces/client-location-interface';
import { Expose } from 'class-transformer';

// tslint:disable:variable-name
export class UserLocation implements ClientLocationInterface {
    @Expose() public id: number;
    @Expose() public country?: number | Country;
    @Expose() public region?: number | Region;
    @Expose() public subregion?: number;
    @Expose() public city: number | City;
    @Expose() public district: number;
    @Expose() public postal_code: number;
    @Expose() public address: string;
    @Expose() public coordinates: {
        type: string,
        coordinates: number[],
    };
    @Expose() public units: number;
    @Expose() public timezone: string;
    @Expose() public is_default: boolean;
}
