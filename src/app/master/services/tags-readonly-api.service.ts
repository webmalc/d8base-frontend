import {Injectable} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {Tag} from '@app/master/models/tag';
import {environment} from '@env/environment';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class TagsReadonlyApiService {

    private readonly url = environment.backend.master_list;

    constructor(private readonly client: ApiClientService) {
    }

    public getByMasterId(id: number): Observable<ApiListResponseInterface<Tag>> {
        return this.client.get<{ tags: Tag[] }>(this.getUrl() + id.toString()).pipe(
            map(data => ({count: data.tags.length, results: data.tags, next: null, previous: null})),
        );
    }

    protected getUrl(): string {
        return this.url;
    }

    // @ts-ignore
    protected transform(data: Tag | Tag[]): Tag | Tag[] {
        return plainToClass(Tag, data);
    }
}
