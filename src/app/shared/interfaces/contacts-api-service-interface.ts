import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ClientContactInterface} from '@app/shared/interfaces/client-contact-interface';
import {Observable} from 'rxjs';

export interface ContactsApiServiceInterface {
    getByClientId(id: number): Observable<ApiListResponseInterface<ClientContactInterface>>;
    saveList(contactsList: ClientContactInterface[]): Observable<ClientContactInterface[]>;
    updateList(contactsList: ClientContactInterface[]): Observable<ClientContactInterface[]>;
    deleteList(contactsList: ClientContactInterface[]): Observable<any>;
    getCurrentClientContacts(): Observable<ApiListResponseInterface<ClientContactInterface>>;
}
