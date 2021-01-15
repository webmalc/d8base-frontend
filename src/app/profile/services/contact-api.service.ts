import { Injectable } from '@angular/core';
import { AbstractReadonlyApiService } from '@app/core/abstract/abstract-readonly-api.service';
import { ApiListResponseInterface } from '@app/core/interfaces/api-list-response.interface';
import { ApiClientService } from '@app/core/services/api-client.service';
import { Contact } from '@app/profile/models/contact';
import { environment } from '@env/environment';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactApiService extends AbstractReadonlyApiService<Contact> {

  private readonly url = environment.backend.contact;

  constructor(protected client: ApiClientService) {
    super(client);
  }

  public get(params?: {
    by_country?: string;
    countries?: string;
    excluded_countries?: string;
    search?: string;
    ordering?: string;
    page?: string;
    page_size?: string;
    is_default?: string;
  }): Observable<ApiListResponseInterface<Contact>> {
    return super.get(params);
  }

  protected getUrl(): string {
    return this.url;
  }

  // @ts-ignore
  protected transform(data: Contact | Contact[]): Contact | Contact[] {
    return plainToClass(Contact, data);
  }
}
