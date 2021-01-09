import { Injectable } from '@angular/core';
import { AbstractReadonlyApiService } from '@app/core/abstract/abstract-readonly-api.service';
import { ApiClientService } from '@app/core/services/api-client.service';
import { PublicReview } from '@app/master/models/public-review';
import { environment } from '@env/environment';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ReviewsReadonlyApiService extends AbstractReadonlyApiService<PublicReview> {

  private readonly url = environment.backend.reviews_readonly;

  constructor(protected client: ApiClientService) {
    super(client);
  }

  protected getUrl(): string {
    return this.url;
  }

  // @ts-ignore
  protected transform(data: PublicReview | PublicReview[]): PublicReview | PublicReview[] {
    return plainToClass(PublicReview, data);
  }
}
