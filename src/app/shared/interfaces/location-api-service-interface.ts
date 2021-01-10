import { ApiListResponseInterface } from '@app/core/interfaces/api-list-response.interface';
import { ApiServiceInterface } from '@app/core/interfaces/api-service-interface';
import { ClientLocationInterface } from '@app/shared/interfaces/client-location-interface';
import { Observable } from 'rxjs';

export interface LocationApiServiceInterface extends ApiServiceInterface<ClientLocationInterface> {
  getByClientId(clientId?: number): Observable<ApiListResponseInterface<ClientLocationInterface>>;

  getTimeZoneList(): Observable<Array<{ value: string, display_name: string }>>;
}
