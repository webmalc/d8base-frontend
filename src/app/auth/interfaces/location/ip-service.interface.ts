import { IpLocation } from '@app/core/models/ip-location';
import { Observable } from 'rxjs';

export interface IpServiceInterface {
    getData(): Observable<IpLocation>;
}
