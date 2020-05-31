import {Injectable} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {UserLocation} from '@app/core/models/user-location';
import {ApiClientService} from '@app/core/services/api-client.service';
import {AbstractLocationService} from '@app/core/services/location/abstract-location.service';
import {LocationTypes} from '@app/core/types/location-types';
import {City} from '@app/profile/models/city';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CitiesApiService extends AbstractLocationService {

    private readonly url = environment.backend.cities;

    constructor(protected client: ApiClientService) {
        super(client);
    }

    public getList(
        params: {
            country?: string,
            region?: string,
            subregion?: string,
            timezone?: string,
            search?: string,
            ordering?: string,
            page?: string,
            page_size?: string
        }
    ): Observable<ApiListResponseInterface<LocationTypes>> {
        return super.getList(params);
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

    protected getPlainToClass(results: LocationTypes[] | LocationTypes): LocationTypes | LocationTypes[] {
        return plainToClass(City, results);
    }

    protected getUrl(): string {
        return this.url;
    }
}
