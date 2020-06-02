import {Injectable} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {MasterLocation} from '@app/master/models/master-location';
import {LocationApiServiceInterface} from '@app/shared/interfaces/location-api-service-interface';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MasterLocationApiService implements LocationApiServiceInterface {

    private readonly url = environment.backend.professional_location;

    constructor(private api: ApiClientService) {
    }

    public update(location: MasterLocation): Observable<MasterLocation> {
        return this.api.patch(`${this.url + location.id}/`, location).pipe(
            map(raw => plainToClass(MasterLocation, raw))
        );
    }

    public save(location: MasterLocation): Observable<MasterLocation> {
        return this.api.post(this.url, location).pipe(
            map(raw => plainToClass(MasterLocation, raw))
        );
    }

    public get(clientId?: number): Observable<ApiListResponseInterface<MasterLocation>> {
        return this.api.get(this.url, {professional: clientId.toString(10)}).pipe(
            map((raw: ApiListResponseInterface<MasterLocation>) => {
                raw.results = plainToClass(MasterLocation, raw.results);

                return raw;
            })
        );
    }

    public delete(location: MasterLocation): Observable<any> {
        return this.api.delete(`${this.url + location.id}/`);
    }

    public getTimeZoneList(): Observable<{ actions: { POST: { timezone: { choices: Array<{ value: string, display_name: string }> } } } }> {
        return this.api.options(this.url).pipe(
            map((raw: { actions: { POST: { timezone: { choices: Array<{ value: string, display_name: string }> } } } }) => raw)
        );
    }
}
