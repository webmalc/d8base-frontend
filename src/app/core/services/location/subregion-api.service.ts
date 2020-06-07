import { Injectable } from '@angular/core';
import {AbstractApiService} from '@app/core/abstract/abstract-api.service';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {Subregion} from '@app/core/models/subregion';
import {ApiClientService} from '@app/core/services/api-client.service';
import {LocationTypes} from '@app/core/types/location-types';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SubregionApiService extends AbstractApiService<Subregion> {

    private readonly url = environment.backend.subregions;

    constructor(protected client: ApiClientService) {
        super(client);
    }

    public get(
        params: {
            region?: string,
            region__country?: string,
            search?: string,
            ordering?: string,
            page?: string,
            page_size?: string
        }
    ): Observable<ApiListResponseInterface<Subregion>> {
        return super.get(params);
    }

    public create(data: Subregion): Observable<Subregion> {
        throw Error('readonly endpoint');
    }

    public createList(data: Subregion[]): Observable<Subregion[]> {
        throw Error('readonly endpoint');
    }

    public patch(data: Subregion): Observable<Subregion> {
        throw Error('readonly endpoint');
    }

    public patchList(data: Subregion[]): Observable<Subregion[]> {
        throw Error('readonly endpoint');
    }

    public put(data: Subregion): Observable<Subregion> {
        throw Error('readonly endpoint');
    }

    public putList(data: Subregion[]): Observable<Subregion[]> {
        throw Error('readonly endpoint');
    }

    public delete(data: Subregion): Observable<any> {
        throw Error('readonly endpoint');
    }

    public deleteList(data: Subregion[]): Observable<any> {
        throw Error('readonly endpoint');
    }

    // @ts-ignore
    protected transform(results: LocationTypes[] | LocationTypes): LocationTypes | LocationTypes[] {
        return plainToClass(Subregion, results);
    }

    protected getUrl(): string {
        return this.url;
    }
}
