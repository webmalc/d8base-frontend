import {IpDataInterface} from './ip-data.interface';

export interface IpServiceInterface {
    getData(): Promise<IpDataInterface>;
}
