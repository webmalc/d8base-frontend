import {Injectable} from '@angular/core';
import {AbstractApiService} from '@app/core/abstract/abstract-api.service';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ApiServiceInterface} from '@app/core/interfaces/api-service-interface';
import {UserLocation} from '@app/core/models/user-location';
import {ApiClientService} from '@app/core/services/api-client.service';
import {ClientLocationInterface} from '@app/shared/interfaces/client-location-interface';
import {LocationApiServiceInterface} from '@app/shared/interfaces/location-api-service-interface';
import {environment} from '@env/environment';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserLocationApiService extends AbstractApiService<ClientLocationInterface>
    implements LocationApiServiceInterface, ApiServiceInterface<ClientLocationInterface> {

    private readonly URL = environment.backend.location;

    constructor(private readonly client: ApiClientService) {
        super(client);
    }

    public getDefaultLocation(): Observable<UserLocation> {
        return super.get().pipe(
            map((locationList: ApiListResponseInterface<ClientLocationInterface>) =>
                locationList.results.filter(location => location.is_default === true)[0] as UserLocation)
        );
    }

    public getByClientId(): Observable<ApiListResponseInterface<ClientLocationInterface>> {
        return super.get();
    }

    public getTimeZoneList(): Observable<Array<{ value: string, display_name: string }>> {
        return this.client.options(this.URL).pipe(
            map((raw: { actions: { POST: { timezone: { choices: Array<{ value: string, display_name: string }> } } } }) =>
                raw.actions.POST.timezone.choices)
        );
    }

    protected getUrl(): string {
        return this.URL;
    }

    // @ts-ignore
    protected transform(data: ClientLocationInterface | ClientLocationInterface[]): ClientLocationInterface | ClientLocationInterface[] {
        return plainToClass(UserLocation, data);
    }
}
