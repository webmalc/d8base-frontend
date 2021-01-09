import { Injectable } from '@angular/core';
import { AbstractApiService } from '@app/core/abstract/abstract-api.service';
import { ApiListResponseInterface } from '@app/core/interfaces/api-list-response.interface';
import { ApiClientService } from '@app/core/services/api-client.service';
import { MasterContact } from '@app/master/models/master-contact';
import { ClientContactInterface } from '@app/shared/interfaces/client-contact-interface';
import { ContactsApiServiceInterface } from '@app/shared/interfaces/contacts-api-service-interface';
import { environment } from '@env/environment';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MasterContactsApiService extends AbstractApiService<ClientContactInterface>
  implements ContactsApiServiceInterface {

  private readonly url = environment.backend.professional_contact;

  constructor(protected client: ApiClientService) {
    super(client);
  }

  public getByClientId(
    masterId: number,
    params?: { [param: string]: string | string[]; },
  ): Observable<ApiListResponseInterface<MasterContact>> {
    return super.get({ professional: masterId.toString(10), ...params });
  }

  public getCurrentClientContacts(): Observable<ApiListResponseInterface<MasterContact>> {
    return this.client.get<ApiListResponseInterface<MasterContact>>(this.url).pipe(
      map(response => {
        response.results = plainToClass(MasterContact, response.results);

        return response;
      }),
    );
  }

  protected getUrl(): string {
    return this.url;
  }

  // @ts-ignore
  protected transform(data: MasterContact | MasterContact[]): MasterContact | MasterContact[] {
    return plainToClass(MasterContact, data);
  }
}
