import {Injectable} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ApiServiceInterface} from '@app/core/interfaces/api-service-interface';
import {UserLocation} from '@app/core/models/user-location';
import {ApiClientService} from '@app/core/services/api-client.service';
import {LocationApiServiceInterface} from '@app/shared/interfaces/location-api-service-interface';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserLocationApiService implements LocationApiServiceInterface, Partial<ApiServiceInterface<UserLocation>> {

    private readonly URL = environment.backend.location;

    constructor(private client: ApiClientService) {
    }

    public patch(location: UserLocation): Observable<UserLocation> {
        return this.client.patch(`${this.URL + location.id}/`, location).pipe(
            map(raw => plainToClass(UserLocation, raw))
        );
    }

    public create(location: UserLocation): Observable<UserLocation> {
        return this.client.post<UserLocation>(this.URL, location);
    }

    public get(): Observable<ApiListResponseInterface<UserLocation>> {
        return this.client.get(this.URL).pipe(
            map((raw: ApiListResponseInterface<UserLocation>) => {
                raw.results = plainToClass(UserLocation, raw.results);

                return raw;
            })
        );
    }

    public delete(location: UserLocation): Observable<any> {
        return this.client.delete(`${this.URL + location.id}/`);
    }

    public getTimeZoneList(): Observable<Array<{ value: string, display_name: string }>> {
        return this.client.options(this.URL).pipe(
            map((raw: { actions: { POST: { timezone: { choices: Array<{ value: string, display_name: string }> } } } }) =>
                raw.actions.POST.timezone.choices)
        );
    }
}
