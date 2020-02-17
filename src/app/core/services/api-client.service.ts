import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiClientService {

    constructor(private http: HttpClient) { }

    public get<T>(url: string): Observable<T> {
        return this.http.get<T>(this.getHost() + url);
    }

    public post<T>(url: string, data: object = {}): Observable<T> {
        return this.http.post<T>(this.getHost() + url, data);
    }

    private getHost(): string {
        return environment.backend.url;
    }
}
