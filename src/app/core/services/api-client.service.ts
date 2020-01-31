import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiClientService {

    constructor(private http: HttpClient) { }

    public get <T>(url: string, params?: { [param: string]: string | string[]; } ): Observable<T> {
        return this.http.get<any>(this.getHost() + url, {
            params
        });
    }

    public post(url: string, data: object = {}): Observable<any> {
        return this.http.post<any>(this.getHost() + url, data);
    }

    private getHost(): string {
        return environment.backend.url;
    }
}
