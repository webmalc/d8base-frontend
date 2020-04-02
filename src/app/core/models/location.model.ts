import {Expose} from 'class-transformer';

export class LocationModel {
    @Expose() public id?: number;
    @Expose() public country?: number;
    @Expose() public region?: number;
    @Expose() public subregion?: number;
    @Expose() public city: number;
    @Expose() public district: number;
    @Expose() public postal_code: number;
    @Expose() public address: string;
    @Expose() public coordinates: {
        type: string,
        coordinates: number[]
    };
    @Expose() public is_default: boolean;
    @Expose() public userId?: number;
}
