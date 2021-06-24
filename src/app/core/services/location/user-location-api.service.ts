import { Injectable } from '@angular/core';
import { AbstractApiService } from '@app/core/abstract/abstract-api.service';
import { ApiListResponseInterface } from '@app/core/interfaces/api-list-response.interface';
import { ApiServiceInterface } from '@app/core/interfaces/api-service-interface';
import { UserLocation } from '@app/core/models/user-location';
import { ApiClientService } from '@app/core/services/api-client.service';
import { LocationApiServiceInterface } from '@app/shared/interfaces/location-api-service-interface';
import { environment } from '@env/environment';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserLocationApiService
  extends AbstractApiService<UserLocation>
  implements LocationApiServiceInterface, ApiServiceInterface<UserLocation> {
  private readonly URL = environment.backend.location;

  constructor(private readonly client: ApiClientService) {
    super(client);
  }

  public getByClientId(): Observable<ApiListResponseInterface<UserLocation>> {
    return super.get();
  }

  public getTimeZoneList(): Observable<Array<{ value: string; display_name: string }>> {
    return this.client
      .options(this.URL)
      .pipe(
        map(
          (raw: { actions: { POST: { timezone: { choices: Array<{ value: string; display_name: string }> } } } }) =>
            raw.actions.POST.timezone.choices,
        ),
      );
  }

  protected getUrl(): string {
    return this.URL;
  }

  // @ts-ignore
  protected transform(data: UserLocation | UserLocation[]): UserLocation | UserLocation[] {
    return plainToClass(UserLocation, data);
  }
}
