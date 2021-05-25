import { Injectable } from '@angular/core';
import { AbstractApiService } from '@app/core/abstract/abstract-api.service';
import { ApiClientService } from '@app/core/services/api-client.service';
import { ServiceLocation } from '@app/service/models/service-location';
import { environment } from '@env/environment';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ServiceLocationApiService extends AbstractApiService<ServiceLocation> {
  private readonly url = environment.backend.service_location;

  constructor(protected client: ApiClientService) {
    super(client);
  }

  protected getUrl(): string {
    return this.url;
  }

  // @ts-ignore
  protected transform(data: ServiceLocation | ServiceLocation[]): ServiceLocation | ServiceLocation[] {
    return plainToClass(ServiceLocation, data);
  }
}
