import { Injectable } from '@angular/core';
import {AbstractApiService} from '@app/core/abstract/abstract-api.service';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {District} from '@app/core/models/district';
import {ApiClientService} from '@app/core/services/api-client.service';
import {LocationTypes} from '@app/core/types/location-types';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DistrictApiService extends AbstractApiService<District> {

    private readonly url = environment.backend.districts;

    constructor(protected client: ApiClientService) {
        super(client);
    }

    public get(
        params: {
            District?: string,
            search?: string,
            ordering?: string,
            page?: string,
            page_size?: string
        }
    ): Observable<ApiListResponseInterface<District>> {
        return super.get(params);
    }

    public create(data: District): Observable<District> {
        throw Error('readonly endpoint');
    }

    public createList(data: District[]): Observable<District[]> {
        throw Error('readonly endpoint');
    }

    public patch(data: District): Observable<District> {
        throw Error('readonly endpoint');
    }

    public patchList(data: District[]): Observable<District[]> {
        throw Error('readonly endpoint');
    }

    public put(data: District): Observable<District> {
        throw Error('readonly endpoint');
    }

    public putList(data: District[]): Observable<District[]> {
        throw Error('readonly endpoint');
    }

    public delete(data: District): Observable<any> {
        throw Error('readonly endpoint');
    }

    public deleteList(data: District[]): Observable<any> {
        throw Error('readonly endpoint');
    }

    // @ts-ignore
    protected transform(results: LocationTypes[] | LocationTypes): LocationTypes | LocationTypes[] {
        return plainToClass(District, results);
    }

    protected getUrl(): string {
        return this.url;
    }
}
