import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiClientService {

    constructor(private http: HttpClient) { }

    public get(url: string): Observable<any > {
        return this.http.get<any>(this.getHost() + url);
    }

    public post(url: string, data: object = {}): Observable<any> {
        return this.http.post<any>(this.getHost() + url, data);
    }

    private getHost(): string {
        return environment.backend.url;
    }
}
