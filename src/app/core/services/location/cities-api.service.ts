import {Injectable} from '@angular/core';
import {AbstractReadonlyApiService} from '@app/core/abstract/abstract-readonly-api.service';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {UserLocation} from '@app/core/models/user-location';
import {ApiClientService} from '@app/core/services/api-client.service';
import {LocationTypes} from '@app/core/types/location-types';
import {City} from '@app/profile/models/city';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CitiesApiService extends AbstractReadonlyApiService<City> {

    private readonly url = environment.backend.cities;

    constructor(protected client: ApiClientService) {
        super(client);
    }

    public get(
        params: {
            country?: string,
            City?: string,
            subCity?: string,
            timezone?: string,
            search?: string,
            ordering?: string,
            page?: string,
            page_size?: string
        }
    ): Observable<ApiListResponseInterface<City>> {
        return super.get(params);
    }

    public getByLocation(dist: number, location: UserLocation): Observable<ApiListResponseInterface<City>> {
        return this.client.get<ApiListResponseInterface<City>>(this.url, {
            dist: dist.toString(10),
            point: `6.061326,49.930906` // TODO
            // point: `${location.coordinates.coordinates[1]},${location.coordinates.coordinates[0]}`
        }).pipe(
            map(result => {
                result.results = plainToClass(City, result.results);

                return result;
            })
        );
    }

    // @ts-ignore
    protected transform(results: LocationTypes[] | LocationTypes): LocationTypes | LocationTypes[] {
        return plainToClass(City, results);
    }

    protected getUrl(): string {
        return this.url;
    }
}
