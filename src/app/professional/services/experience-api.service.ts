import { Injectable } from '@angular/core';
import { AbstractApiService } from '@app/core/abstract/abstract-api.service';
import { ApiListResponseInterface } from '@app/core/interfaces/api-list-response.interface';
import { ApiServiceInterface } from '@app/core/interfaces/api-service-interface';
import { ApiClientService } from '@app/core/services/api/api-client.service';
import { Experience } from '@app/professional/models/experience';
import { environment } from '@env/environment';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';

@Injectable()
export class ExperienceApiService extends AbstractApiService<Experience> implements ApiServiceInterface<Experience> {
  private readonly url = environment.backend.experience;

  constructor(protected client: ApiClientService) {
    super(client);
  }

  public getByMasterId(masterId: number): Observable<ApiListResponseInterface<Experience>> {
    return super.get({ professional: masterId?.toString(10) });
  }

  protected getUrl(): string {
    return this.url;
  }

  // @ts-ignore
  protected transform(data: Experience | Experience[]): Experience | Experience[] {
    return plainToClass(Experience, data);
  }
}
