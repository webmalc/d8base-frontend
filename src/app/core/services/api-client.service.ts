import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiClientService {

    constructor(private http: HttpClient) { }

    public get <T>(url: string, params?: { [param: string]: string | string[]; } ): Observable<T> {
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

    private getHost(): string {
        return environment.backend.url;
    }
}
