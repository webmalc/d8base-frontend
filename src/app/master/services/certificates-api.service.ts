import { Injectable } from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ApiServiceInterface} from '@app/core/interfaces/api-service-interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {Certificate} from '@app/master/models/certificate';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable()
export class CertificatesApiService implements Partial<ApiServiceInterface<Certificate>> {

    private readonly url = environment.backend.certificates;

    constructor(private client: ApiClientService) { }

    public get(masterId: number): Observable<ApiListResponseInterface<Certificate>> {
        return this.client.get(this.url, {professional: masterId?.toString(10)}).pipe(
            map((raw: ApiListResponseInterface<Certificate>) => {
                raw.results = plainToClass(Certificate, raw.results);

                return raw;
            })
        );
    }

    public create(certificate: Certificate): Observable<Certificate> {
        return this.client.post(this.url, certificate).pipe(
            map(raw => plainToClass(Certificate, raw))
        );
    }

    public patch(certificate: Certificate): Observable<Certificate> {
        return this.client.patch(`${this.url + certificate.id}/`, certificate).pipe(
            map(raw => plainToClass(Certificate, raw))
        );
    }

    public delete(certificate: Certificate): Observable<Certificate> {
        return this.client.delete(`${this.url + certificate.id}/`);
    }
}
