import { Injectable } from '@angular/core';
import { AbstractReadonlyApiService } from '@app/core/abstract/abstract-readonly-api.service';
import { PostalCode } from '@app/core/models/postal-code';
import { ApiClientService } from '@app/core/services/api-client.service';
import { environment } from '@env/environment';
import { plainToClass } from 'class-transformer';

@Injectable({
  providedIn: 'root',
})
export class PostalCodeApiService extends AbstractReadonlyApiService<PostalCode> {

  private readonly url = environment.backend.postal_codes;

  constructor(protected client: ApiClientService) {
    super(client);
  }

  protected getUrl(): string {
    return this.url;
  }

  // @ts-ignore
  protected transform(data: PostalCode | PostalCode[]): PostalCode | PostalCode[] {
    return plainToClass(PostalCode, data);
  }
}
