import {Injectable} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {Education} from '@app/master/models/education';
import {environment} from '@env/environment';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
    providedIn: 'root',
})
export class MasterEducationReadonlyApiService {

    private readonly url = environment.backend.master_list;

    constructor(private readonly client: ApiClientService) {
    }

    public getByMasterId(id: number): Observable<ApiListResponseInterface<Education>> {
        return this.client.get<{ educations: Education[] }>(this.getUrl() + id.toString()).pipe(
            map(data => ({count: data.educations.length, results: data.educations, next: null, previous: null})),
        );
    }

    protected getUrl(): string {
        return this.url;
    }

    // @ts-ignore
    protected transform(data: Education | Education[]): Education | Education[] {
        return plainToClass(Education, data);
    }
}
