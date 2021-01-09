import { ApiListResponseInterface } from '@app/core/interfaces/api-list-response.interface';
import { ApiServiceInterface } from '@app/core/interfaces/api-service-interface';
import { ClientContactInterface } from '@app/shared/interfaces/client-contact-interface';
import { Observable } from 'rxjs';

export interface ContactsApiServiceInterface extends ApiServiceInterface<ClientContactInterface> {
  getByClientId(id?: number): Observable<ApiListResponseInterface<ClientContactInterface>>;

  createList(contactsList: ClientContactInterface[]): Observable<ClientContactInterface[]>;

  putList(contactsList: ClientContactInterface[]): Observable<ClientContactInterface[]>;

  deleteList(contactsList: ClientContactInterface[]): Observable<any>;

  getCurrentClientContacts(): Observable<ApiListResponseInterface<ClientContactInterface>>;
}
