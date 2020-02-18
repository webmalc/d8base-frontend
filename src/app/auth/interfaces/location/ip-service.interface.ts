import {LocationModel} from '@app/core/models/location.model';

export interface IpServiceInterface {
    getData(): Promise<LocationModel>;
}
