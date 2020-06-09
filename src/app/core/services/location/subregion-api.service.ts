import { Injectable } from '@angular/core';
import {AbstractReadonlyApiService} from '@app/core/abstract/abstract-readonly-api.service';
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
export class SubregionApiService extends AbstractReadonlyApiService<Subregion> {

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

    // @ts-ignore
    protected transform(results: LocationTypes[] | LocationTypes): LocationTypes | LocationTypes[] {
        return plainToClass(Subregion, results);
    }

    protected getUrl(): string {
        return this.url;
    }
}
