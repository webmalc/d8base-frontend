import {Injectable} from '@angular/core';
import {AbstractApiService} from '@app/core/abstract/abstract-api.service';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ApiServiceInterface} from '@app/core/interfaces/api-service-interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {UserContact} from '@app/profile/models/user-contact';
import {ClientContactInterface} from '@app/shared/interfaces/client-contact-interface';
import {ContactsApiServiceInterface} from '@app/shared/interfaces/contacts-api-service-interface';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserContactApiService extends AbstractApiService<ClientContactInterface>
    implements ContactsApiServiceInterface, Partial<ApiServiceInterface<UserContact>> {

    private readonly url = environment.backend.user_contact;

    constructor(private client: ApiClientService) {
        super(client);
    }

    public getByClientId(): Observable<ApiListResponseInterface<ClientContactInterface>> {
        return this.getCurrentClientContacts();
    }

    public getCurrentClientContacts(): Observable<ApiListResponseInterface<ClientContactInterface>> {
        return this.client.get<ApiListResponseInterface<UserContact>>(this.url).pipe(
            map(response => {
                response.results = plainToClass(UserContact, response.results);

                return response;
            })
        );
    }

    protected getUrl(): string {
        return this.url;
    }

    // @ts-ignore
    protected transform(data: ClientContactInterface | ClientContactInterface[]): ClientContactInterface | ClientContactInterface[] {
        return plainToClass(UserContact, data);
    }
}
