import { Injectable } from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {Subregion} from '@app/core/models/subregion';
import {ApiClientService} from '@app/core/services/api-client.service';
import {AbstractLocationService} from '@app/core/services/location/abstract-location.service';
import {LocationTypes} from '@app/core/types/location-types';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SubregionApiService extends AbstractLocationService {

    private readonly url = environment.backend.subregions;

    constructor(protected client: ApiClientService) {
        super(client);
    }

    public getList(
        params: {
            region?: string,
            region__country?: string,
            search?: string,
            ordering?: string,
            page?: string,
            page_size?: string
        }
    ): Observable<ApiListResponseInterface<LocationTypes>> {
        return super.getList(params);
    }

    protected getPlainToClass(results: LocationTypes[] | LocationTypes): LocationTypes | LocationTypes[] {
        return plainToClass(Subregion, results);
    }

    protected getUrl(): string {
        return this.url;
    }
}
