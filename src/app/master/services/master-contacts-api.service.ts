import { Injectable } from '@angular/core';
import {AbstractApiService} from '@app/core/abstract/abstract-api.service';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ApiServiceInterface} from '@app/core/interfaces/api-service-interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {MasterContact} from '@app/master/models/master-contact';
import {ClientContactInterface} from '@app/shared/interfaces/client-contact-interface';
import {ContactsApiServiceInterface} from '@app/shared/interfaces/contacts-api-service-interface';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MasterContactsApiService extends AbstractApiService<ClientContactInterface>
    implements ContactsApiServiceInterface, ApiServiceInterface<ClientContactInterface> {

    private readonly url = environment.backend.professional_contact;

    constructor(protected client: ApiClientService) {
        super(client);
    }

    public getByClientId(masterId: number): Observable<ApiListResponseInterface<ClientContactInterface>> {
        return super.get({professional: masterId.toString(10)});
    }

    public getCurrentClientContacts(): Observable<ApiListResponseInterface<ClientContactInterface>> {
        return this.client.get<ApiListResponseInterface<ClientContactInterface>>(this.url).pipe(
            map(response => {
                response.results = plainToClass(MasterContact, response.results);

                return response;
            })
        );
    }

    protected getUrl(): string {
        return this.url;
    }

    // @ts-ignore
    protected transform(data: ClientContactInterface | ClientContactInterface[]): ClientContactInterface | ClientContactInterface[] {
        return plainToClass(MasterContact, data);
    }
}
