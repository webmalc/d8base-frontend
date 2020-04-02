import {IpLocation} from '@app/core/models/ip-location';

export interface IpServiceInterface {
    getData(): Promise<IpLocation>;
}
