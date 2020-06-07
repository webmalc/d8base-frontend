import {Injectable} from '@angular/core';
import {AbstractApiService} from '@app/core/abstract/abstract-api.service';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {LocationTypes} from '@app/core/types/location-types';
import {Country} from '@app/profile/models/country';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CountriesApiService extends AbstractApiService<Country> {

    private readonly url = environment.backend.countries;

    constructor(protected client: ApiClientService) {
        super(client);
    }

    public get(
        params: {
            page_size?: string,
            currency?: string,
            continent?: string,
            search?: string,
            ordering?: string,
            page?: string
        }
    ): Observable<ApiListResponseInterface<Country>> {
        return super.get(params);
    }

    public create(data: Country): Observable<Country> {
        throw Error('readonly endpoint');
    }

    public createList(data: Country[]): Observable<Country[]> {
        throw Error('readonly endpoint');
    }

    public patch(data: Country): Observable<Country> {
        throw Error('readonly endpoint');
    }

    public patchList(data: Country[]): Observable<Country[]> {
        throw Error('readonly endpoint');
    }

    public put(data: Country): Observable<Country> {
        throw Error('readonly endpoint');
    }

    public putList(data: Country[]): Observable<Country[]> {
        throw Error('readonly endpoint');
    }

    public delete(data: Country): Observable<any> {
        throw Error('readonly endpoint');
    }

    public deleteList(data: Country[]): Observable<any> {
        throw Error('readonly endpoint');
    }

    // @ts-ignore
    protected transform(results: LocationTypes[] | LocationTypes): LocationTypes | LocationTypes[] {
        return plainToClass(Country, results);
    }

    protected getUrl(): string {
        return this.url;
    }
}
