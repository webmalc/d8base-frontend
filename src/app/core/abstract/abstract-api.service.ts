import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ApiServiceInterface} from '@app/core/interfaces/api-service-interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export abstract class AbstractApiService<T extends {id: number}> implements ApiServiceInterface<T> {

    protected constructor(protected client: ApiClientService) {
    }

    public get(params?: { [param: string]: string | string[]; }): Observable<ApiListResponseInterface<T>> {
        return this.client.get(this.getUrl(), params).pipe(
            map((raw: ApiListResponseInterface<T>) => {
                raw.results = this.transform(raw.results);

                return raw;
            })
        );
    }

    public getByEntityId(entityId: number): Observable<T> {
        return this.client.get<T>(`${this.getUrl() + entityId}/`).pipe(
            map((raw: T) => this.transform(raw))
        );
    }

    public create(data: T): Observable<T> {
        return this.client.post<T>(this.getUrl(), data).pipe(
            map(raw => this.transform(raw))
        );
    }

    public patch(data: T): Observable<T> {
        return this.client.patch<T>(`${this.getUrl() + data.id}/`, data).pipe(
            map(raw => this.transform(raw))
        );
    }

    public put(data: T): Observable<T> {
        return this.client.put<T>(`${this.getUrl()}${data.id}/`, data).pipe(
            map(raw => this.transform(raw))
        );
    }

    public delete(data: T): Observable<any> {
        return this.client.delete(`${this.getUrl() + data.id}/`);
    }

    public createList(data: T[]): Observable<T[]> {
        return this.client.createList<T>(data, this.getUrl()).pipe(
            map(raw => this.transform(raw))
        );
    }

    public getList(ids: number[]): Observable<T[]> {
        return this.client.getList<T>(ids, this.getUrl()).pipe(
            map(raw => this.transform(raw))
        );
    }

    public patchList(data: T[]): Observable<T[]> {
        return this.client.patchList<T>(data, this.getUrl()).pipe(
            map(raw => this.transform(raw))
        );
    }

    public putList(data: T[]): Observable<T[]> {
        return this.client.putList<T>(data, this.getUrl()).pipe(
            map(raw => this.transform(raw))
        );
    }

    public deleteList(data: T[]): Observable<any> {
        return this.client.deleteList(data, this.getUrl());
    }

    protected abstract getUrl(): string;
    protected abstract transform(data: T): T;
    protected abstract transform(data: T[]): T[];
}
