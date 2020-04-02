import {Injectable} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {Country} from '@app/profile/models/country';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CountriesApiService {

    private readonly url = environment.backend.countries;

    constructor(private client: ApiClientService) {
    }

    public getList(
        params: {
            page_size?: string,
            currency?: string,
            continent?: string,
            search?: string,
            ordering?: string,
            page?: string
        }
    ): Observable<ApiListResponseInterface<Country>> {
        return this.client.get<ApiListResponseInterface<Country>>(this.url, params).pipe(
            map(
                (response: ApiListResponseInterface<Country>) => {
                    response.results = plainToClass(Country, response.results);

                    return response;
                }
            )
        );
    }

    public getSingle(id: number): Observable<Country> {
        return this.client.get<Country>(`${this.url}/${id}`).pipe(
            map(raw => plainToClass(Country, raw))
        );
    }
}
