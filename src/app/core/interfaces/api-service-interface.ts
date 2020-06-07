import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {Observable} from 'rxjs';

export interface ApiServiceInterface<T> {
    get(params?: { [param: string]: string | string[]; }): Observable<ApiListResponseInterface<T>>;
    getByEntityId(entityId: number): Observable<T>;
    create(data: T): Observable<T>;
    createList(data: T[]): Observable<T[]>;
    patch(data: T): Observable<T>;
    patchList(data: T[]): Observable<T[]>;
    put(data: T): Observable<T>;
    putList(data: T[]): Observable<T[]>;
    delete(data: T): Observable<any>;
    deleteList(data: T[]): Observable<any>;
}
