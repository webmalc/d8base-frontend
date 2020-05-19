import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ClientLocationInterface} from '@app/shared/interfaces/client-location-interface';
import {Observable} from 'rxjs';

export interface LocationApiServiceInterface {
    get(clientId?: number): Observable<ApiListResponseInterface<ClientLocationInterface>>;
    save(location: ClientLocationInterface): Observable<ClientLocationInterface>;
    getTimeZoneList(): Observable<{ actions: { POST: { timezone: { choices: Array<{ value: string, display_name: string }> } } } }>;
    update(location: ClientLocationInterface): Observable<ClientLocationInterface>;
}
