import { Injectable } from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {LocationTypes} from '@app/core/types/location-types';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export abstract class AbstractLocationService {

    protected constructor(protected client: ApiClientService) { }

    public getList(
        params?: { [param: string]: string | string[]; }
    ): Observable<ApiListResponseInterface<LocationTypes>> {
        return this.client.get(this.getUrl(), params).pipe(
            map((raw: ApiListResponseInterface<LocationTypes>) => {
                // @ts-ignore
                raw.results = this.getPlainToClass(raw.results);

                return raw;
            })
        );
    }

    public getSingle(id: number): Observable<LocationTypes> {
        // @ts-ignore
        return this.client.get(`${this.getUrl()}${id}`).pipe(
            map((raw: LocationTypes) => this.getPlainToClass(raw))
        );
    }

    protected abstract getUrl(): string;
    protected abstract getPlainToClass(results: LocationTypes[] | LocationTypes): LocationTypes | LocationTypes[];
}
