import {Injectable} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {Region} from '@app/core/models/region';
import {ApiClientService} from '@app/core/services/api-client.service';
import {AbstractLocationService} from '@app/core/services/location/abstract-location.service';
import {LocationTypes} from '@app/core/types/location-types';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RegionApiService extends AbstractLocationService {

    private readonly url = environment.backend.regions;

    constructor(protected client: ApiClientService) {
        super(client);
    }

    public getList(
        params: {
            country?: string,
            code?: string,
            search?: string,
            ordering?: string,
            page?: string,
            page_size?: string
        }
    ): Observable<ApiListResponseInterface<LocationTypes>> {
        return super.getList(params);
    }

    protected getPlainToClass(results: Region | Region[]): Region | Region[] {
        return plainToClass(Region, results);
    }

    protected getUrl(): string {
        return this.url;
    }
}
