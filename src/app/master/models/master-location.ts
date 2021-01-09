import { UserLocation } from '@app/core/models/user-location';
import { ClientLocationInterface } from '@app/shared/interfaces/client-location-interface';
import { Expose } from 'class-transformer';

export class MasterLocation extends UserLocation implements ClientLocationInterface {
    @Expose() public professional: number;
}
