import { Injectable } from '@angular/core';
import { AbstractReadonlyApiService } from '@app/core/abstract/abstract-readonly-api.service';
import { ApiListResponseInterface } from '@app/core/interfaces/api-list-response.interface';
import { District } from '@app/core/models/district';
import { ApiClientService } from '@app/core/services/api-client.service';
import { LocationTypes } from '@app/core/types/location-types';
import { environment } from '@env/environment';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DistrictApiService extends AbstractReadonlyApiService<District> {

  private readonly url = environment.backend.districts;

  constructor(protected client: ApiClientService) {
    super(client);
  }

  public get(
    params: {
      District?: string;
      search?: string;
      ordering?: string;
      page?: string;
      page_size?: string;
    },
  ): Observable<ApiListResponseInterface<District>> {
    return super.get(params);
  }

  // @ts-ignore
  protected transform(results: LocationTypes[] | LocationTypes): LocationTypes | LocationTypes[] {
    return plainToClass(District, results);
  }

  protected getUrl(): string {
    return this.url;
  }
}
