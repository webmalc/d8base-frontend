import { Injectable } from '@angular/core';
import { AbstractApiService } from '@app/core/abstract/abstract-api.service';
import { ApiListResponseInterface } from '@app/core/interfaces/api-list-response.interface';
import { ApiServiceInterface } from '@app/core/interfaces/api-service-interface';
import { ApiClientService } from '@app/core/services/api/api-client.service';
import { Tag } from '@app/master/models/tag';
import { environment } from '@env/environment';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagsApiService extends AbstractApiService<Tag> implements ApiServiceInterface<Tag> {
  private readonly url = environment.backend.professional_tags;

  constructor(private readonly client: ApiClientService) {
    super(client);
  }

  public getByMasterId(
    masterId: number,
    params?: { [param: string]: string | string[] },
  ): Observable<ApiListResponseInterface<Tag>> {
    return this.client.get(this.url, { professional: masterId?.toString(10), ...params });
  }

  protected getUrl(): string {
    return this.url;
  }

  // @ts-ignore
  protected transform(data: Tag | Tag[]): Tag | Tag[] {
    return plainToClass(Tag, data);
  }
}
