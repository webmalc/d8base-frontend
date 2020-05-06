import { Injectable } from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {Tag} from '@app/master/models/tag';
import {plainToClass} from 'class-transformer';
import {forkJoin, Observable, of} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TagsApiService {

    private readonly url = environment.backend.professional_tags;
    private readonly urlList = environment.backend.professional_tags_list;

    constructor(private client: ApiClientService) { }

    public getList(): Observable<ApiListResponseInterface<Tag>> {
        return this.client.get(this.urlList).pipe(
            map((raw: ApiListResponseInterface<Tag>) => {
                raw.results = plainToClass(Tag, raw.results);

                return raw;
            })
        );
    }

    public getCurrentMasterTagsList(masterId: number): Observable<ApiListResponseInterface<Tag>> {
        return this.client.get(this.url, {professional: masterId.toString()}).pipe(
            map((raw: ApiListResponseInterface<Tag>) => {
                raw.results = plainToClass(Tag, raw.results);

                return raw;
            })
        );
    }

    public deleteList(tagList: Tag[]): Observable<any> {
        return 0 === tagList.length ? of([]) :  of(tagList).pipe(
            mergeMap((tags) => forkJoin(
                ...tags.map(tag => this.client.delete(`${this.url}${tag.id}/`))
            ))
        );
    }

    public saveList(tagList: Tag[]): Observable<any> {
        return 0 === tagList.length ? of([]) :  of(tagList).pipe(
            mergeMap((tags) => forkJoin(
                ...tags.map(tag => this.client.post(this.url, tag))
            ))
        );
    }

    public save(tag: Tag): Observable<Tag> {
        return this.client.post(this.url, tag).pipe(
            map(raw => plainToClass(Tag, raw))
        );
    }
}
