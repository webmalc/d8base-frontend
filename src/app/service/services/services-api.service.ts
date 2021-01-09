import { Injectable } from '@angular/core';
import { AbstractApiService } from '@app/core/abstract/abstract-api.service';
import { ApiClientService } from '@app/core/services/api-client.service';
import { Service } from '@app/service/models/service';
import { environment } from '@env/environment';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServicesApiService extends AbstractApiService<Service> {

  private readonly url = environment.backend.services;

  constructor(protected client: ApiClientService) {
    super(client);
  }

  public getServiceTypeList(): Observable<{ value: string, display_name: string }[]> {
    return super.options<{ actions: { POST: { service_type: { choices: { value: string, display_name: string }[] } } } }>().pipe(
      map(data =>
        data.actions.POST.service_type.choices),
    );
  }

  protected getUrl(): string {
    return this.url;
  }

  // @ts-ignore
  protected transform(data: Service | Service[]): Service | Service[] {
    return plainToClass(Service, data);
  }
}
