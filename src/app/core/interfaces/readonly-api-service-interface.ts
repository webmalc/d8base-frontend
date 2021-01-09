import { ApiListResponseInterface } from '@app/core/interfaces/api-list-response.interface';
import { Observable } from 'rxjs';

export interface ReadonlyApiServiceInterface<T> {
    get(params?: { [param: string]: string | string[] | boolean; }): Observable<ApiListResponseInterface<T>>;
    getByEntityId(entityId: number): Observable<T>;
    getList(ids: number[]): Observable<T[]>;
}
