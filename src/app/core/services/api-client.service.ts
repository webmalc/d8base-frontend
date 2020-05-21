import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserContact} from '@app/profile/models/user-contact';
import {forkJoin, Observable, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiClientService {

    constructor(private http: HttpClient) {
    }

    public get<T>(url: string, params?: { [param: string]: string | string[]; }): Observable<T> {
        return this.http.get<T>(this.getHost() + url, {params});
    }

    public post<T>(url: string, data: object = {}): Observable<T> {
        return this.http.post<T>(this.getHost() + url, data);
    }

    public put<T>(url: string, data: object = {}): Observable<T> {
        return this.http.put<T>(this.getHost() + url, data);
    }

    public patch<T>(url: string, data: object = {}): Observable<T> {
        return this.http.patch<T>(this.getHost() + url, data);
    }

    public delete(url: string, params?: { [param: string]: string | string[]; }): Observable<any> {
        return this.http.delete(this.getHost() + url, params);
    }

    public options<T>(url: string, params?: { [param: string]: string | string[]; }): Observable<T> {
        return this.http.options<T>(this.getHost() + url, params);
    }

    public deleteList<T extends {id: number}>(dataList: T[], url: string): Observable<any> {
        return 0 === dataList.length ? of([]) :  of(dataList).pipe(
            mergeMap((list) => forkJoin(
                ...list.map((value: {id: number}) => this.delete(`${url + value.id}/`))
            ))
        );
    }

    public putList<T extends {id: number}>(dataList: T[], url: string): Observable<T[]> {
        return 0 === dataList.length ? of([]) :  of(dataList).pipe(
            mergeMap((list) => forkJoin(
                ...list.map((value: {id: number}) => this.put<UserContact>(`${url}${value.id}/`, value))
            ))
        );
    }

    public patchList<T extends {id: number}>(dataList: T[], url: string): Observable<T[]> {
        return 0 === dataList.length ? of([]) :  of(dataList).pipe(
            mergeMap((list) => forkJoin(
                ...list.map((value: {id: number}) => this.patch<UserContact>(`${url}${value.id}/`, value))
            ))
        );
    }

    public postList<T extends {id: number}>(dataList: T[], url: string): Observable<T[]> {
        return 0 === dataList.length ? of([]) : of(dataList).pipe(
            mergeMap((list) => forkJoin(
                ...list.map((value: {id: number}) => this.post<UserContact>(url, value))
            ))
        );
    }

    private getHost(): string {
        return environment.backend.url;
    }
}
