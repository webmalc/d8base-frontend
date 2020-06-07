import { Injectable } from '@angular/core';
import {AbstractApiService} from '@app/core/abstract/abstract-api.service';
import {ApiClientService} from '@app/core/services/api-client.service';
import {Tag} from '@app/master/models/tag';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TagsListApiService extends AbstractApiService<Tag> {

    private readonly url = environment.backend.professional_tags_list;

    constructor(private client: ApiClientService) {
        super(client);
    }

    public create(data: Tag): Observable<Tag> {
        throw Error('readonly endpoint');
    }

    public createList(data: Tag[]): Observable<Tag[]> {
        throw Error('readonly endpoint');
    }

    public patch(data: Tag): Observable<Tag> {
        throw Error('readonly endpoint');
    }

    public patchList(data: Tag[]): Observable<Tag[]> {
        throw Error('readonly endpoint');
    }

    public put(data: Tag): Observable<Tag> {
        throw Error('readonly endpoint');
    }

    public putList(data: Tag[]): Observable<Tag[]> {
        throw Error('readonly endpoint');
    }

    public delete(data: Tag): Observable<any> {
        throw Error('readonly endpoint');
    }

    public deleteList(data: Tag[]): Observable<any> {
        throw Error('readonly endpoint');
    }

    protected getUrl(): string {
        return this.url;
    }

    // @ts-ignore
    protected transform(data: Tag | Tag[]): Tag | Tag[] {
        return plainToClass(Tag, data);
    }
}
