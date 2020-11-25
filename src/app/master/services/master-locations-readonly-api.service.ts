import {Injectable} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {MasterLocation} from '@app/master/models/master-location';
import {environment} from '@env/environment';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MasterLocationsReadonlyApiService {

    private readonly url = environment.backend.master_list;

    constructor(private readonly client: ApiClientService) {
    }

    public getByMasterId(id: number): Observable<ApiListResponseInterface<MasterLocation>> {
        return this.client.get<{ locations: MasterLocation[] }>(this.getUrl() + id.toString()).pipe(
            map(data => ({count: data.locations.length, results: data.locations, next: null, previous: null}))
        );
    }

    protected getUrl(): string {
        return this.url;
    }

    // @ts-ignore
    protected transform(data: MasterLocation | MasterLocation[]): MasterLocation | MasterLocation[] {
        return plainToClass(MasterLocation, data);
    }
}
