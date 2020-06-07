import {Injectable} from '@angular/core';
import {AbstractApiService} from '@app/core/abstract/abstract-api.service';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {Region} from '@app/core/models/region';
import {ApiClientService} from '@app/core/services/api-client.service';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RegionApiService extends AbstractApiService<Region> {

    private readonly url = environment.backend.regions;

    constructor(protected client: ApiClientService) {
        super(client);
    }

    public get(
        params: {
            country?: string,
            code?: string,
            search?: string,
            ordering?: string,
            page?: string,
            page_size?: string
        }
    ): Observable<ApiListResponseInterface<Region>> {
        return super.get(params);
    }

    public create(data: Region): Observable<Region> {
        throw Error('readonly endpoint');
    }

    public createList(data: Region[]): Observable<Region[]> {
        throw Error('readonly endpoint');
    }

    public patch(data: Region): Observable<Region> {
        throw Error('readonly endpoint');
    }

    public patchList(data: Region[]): Observable<Region[]> {
        throw Error('readonly endpoint');
    }

    public put(data: Region): Observable<Region> {
        throw Error('readonly endpoint');
    }

    public putList(data: Region[]): Observable<Region[]> {
        throw Error('readonly endpoint');
    }

    public delete(data: Region): Observable<any> {
        throw Error('readonly endpoint');
    }

    public deleteList(data: Region[]): Observable<any> {
        throw Error('readonly endpoint');
    }

    // @ts-ignore
    protected transform(results: Region | Region[]): Region | Region[] {
        return plainToClass(Region, results);
    }

    protected getUrl(): string {
        return this.url;
    }
}
