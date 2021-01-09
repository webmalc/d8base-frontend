import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IpServiceInterface } from '@app/auth/interfaces/location/ip-service.interface';
import { IpLocation } from '@app/core/models/ip-location';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export abstract class AbstractIpService implements IpServiceInterface {

    protected constructor(protected http: HttpClient) {
    }

    public getData(): Observable<IpLocation> {
        return this.http.get(this.getUrl()).pipe(
            map(raw => this.transform(raw)),
        );
    }

    protected abstract getUrl(): string;

    protected abstract transform(res: object): IpLocation;
}
