import {LocationInterface} from '@app/auth/interfaces/location/location.interface';
import {Expose} from 'class-transformer';

export class LocationModel implements LocationInterface {
    @Expose() public postalCode: string;
    @Expose() public countryCode: string;
    @Expose() public latitude: string | number;
    @Expose() public longitude: string | number;
    @Expose() public city: string;
    @Expose() public country?: string;
    @Expose() public regionCode?: string;
    @Expose() public timezone?: string;
    @Expose() public userId?: number;
}
