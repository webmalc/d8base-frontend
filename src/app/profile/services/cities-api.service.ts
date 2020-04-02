import {Injectable} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {City} from '@app/profile/models/city';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CitiesApiService {

    private readonly url = environment.backend.cities;

    constructor(private client: ApiClientService) {
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
    ): Observable<ApiListResponseInterface<City>> {
        return this.client.get<ApiListResponseInterface<City>>(this.url, params).pipe(
            map(
                (data: ApiListResponseInterface<City>) => {
                    data.results = plainToClass(City, data.results);

                    return data;
                }
            )
        );
    }

    public getSingle(id: number): Observable<City> {
        return this.client.get<City>(`${this.url}/${id}`).pipe(
            map(raw => plainToClass(City, raw))
        );
    }
}
