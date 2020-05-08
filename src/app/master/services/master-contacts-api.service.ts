import { Injectable } from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {MasterContact} from '@app/master/models/master-contact';
import {ClientContactInterface} from '@app/shared/interfaces/client-contact-interface';
import {ContactsApiServiceInterface} from '@app/shared/interfaces/contacts-api-service-interface';
import {plainToClass} from 'class-transformer';
import {forkJoin, Observable, of} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MasterContactsApiService implements ContactsApiServiceInterface {

    private readonly url = environment.backend.professional_contact;

    constructor(private client: ApiClientService) { }

    public getByClientId(id: number): Observable<ApiListResponseInterface<ClientContactInterface>> {
        return this.client.get<ApiListResponseInterface<MasterContact>>(this.url, {professional: id.toString(10)}).pipe(
            map(response => {
                response.results = plainToClass(MasterContact, response.results);

                return response;
            })
        );
    }

    public saveList(contactsList: ClientContactInterface[]): Observable<ClientContactInterface[]> {
        return 0 === contactsList.length ? of([]) : of(contactsList).pipe(
            mergeMap((contacts) => forkJoin(
                ...contacts.map(contact => this.client.post<MasterContact>(this.url, contact))
            ))
        );
    }

    public updateList(contactsList: ClientContactInterface[]): Observable<ClientContactInterface[]> {
        return 0 === contactsList.length ? of([]) :  of(contactsList).pipe(
            mergeMap((contacts) => forkJoin(
                ...contacts.map(contact => this.client.put<MasterContact>(`${this.url}${contact.id}/`, contact))
            ))
        );
    }

    public deleteList(contactsList: ClientContactInterface[]): Observable<any> {
        return 0 === contactsList.length ? of([]) :  of(contactsList).pipe(
            mergeMap((contacts) => forkJoin(
                ...contacts.map(contact => this.client.delete(`${this.url}${contact.id}/`))
            ))
        );
    }

    public getCurrentClientContacts(): Observable<ApiListResponseInterface<ClientContactInterface>> {
        return this.client.get<ApiListResponseInterface<MasterContact>>(this.url).pipe(
            map(response => {
                response.results = plainToClass(MasterContact, response.results);

                return response;
            })
        );
    }
}
