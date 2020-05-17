import { Injectable } from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {District} from '@app/core/models/district';
import {ApiClientService} from '@app/core/services/api-client.service';
import {AbstractLocationService} from '@app/core/services/location/abstract-location.service';
import {LocationTypes} from '@app/core/types/location-types';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DistrictApiService extends AbstractLocationService {

    private readonly url = environment.backend.districts;

    constructor(protected client: ApiClientService) {
        super(client);
    }

    public getList(
        params: {
            city?: string,
            search?: string,
            ordering?: string,
            page?: string,
            page_size?: string
        }
    ): Observable<ApiListResponseInterface<LocationTypes>> {
        return super.getList(params);
    }

    protected getPlainToClass(results: LocationTypes[] | LocationTypes): LocationTypes | LocationTypes[] {
        return plainToClass(District, results);
    }

    protected getUrl(): string {
        return this.url;
    }
}
