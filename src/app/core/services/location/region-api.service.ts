import { Injectable } from '@angular/core';
import { AbstractReadonlyApiService } from '@app/core/abstract/abstract-readonly-api.service';
import { ApiListResponseInterface } from '@app/core/interfaces/api-list-response.interface';
import { Region } from '@app/core/models/region';
import { ApiClientService } from '@app/core/services/api-client.service';
import { environment } from '@env/environment';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegionApiService extends AbstractReadonlyApiService<Region> {

  private readonly url = environment.backend.regions;

  constructor(protected client: ApiClientService) {
    super(client);
  }

  public get(
    params: {
      country?: string,
      code?: string,
      search?: string,
      ordering?: string,
      page?: string,
      page_size?: string,
    },
  ): Observable<ApiListResponseInterface<Region>> {
    return super.get(params);
  }

  // @ts-ignore
  protected transform(results: Region | Region[]): Region | Region[] {
    return plainToClass(Region, results);
  }

  protected getUrl(): string {
    return this.url;
  }
}
