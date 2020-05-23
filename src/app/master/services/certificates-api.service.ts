import { Injectable } from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {Certificate} from '@app/master/models/certificate';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable()
export class CertificatesApiService {

    private readonly url = environment.backend.certificates;

    constructor(private client: ApiClientService) { }

    public get(masterId: number): Observable<ApiListResponseInterface<Certificate>> {
        return this.client.get(this.url, {professional: masterId.toString(10)}).pipe(
            map((raw: ApiListResponseInterface<Certificate>) => {
                raw.results = plainToClass(Certificate, raw.results);

                return raw;
            })
        );
    }

    public create(certificates: Certificate[]): Observable<Certificate[]> {
        return this.client.postList<Certificate>(certificates, this.url).pipe(
            map(raw => plainToClass(Certificate, raw))
        );
    }

    public update(certificates: Certificate[]): Observable<Certificate[]> {
        return this.client.putList<Certificate>(certificates, this.url).pipe(
            map(raw => plainToClass(Certificate, raw))
        );
    }

    public delete(certificates: Certificate[]): Observable<Certificate[]> {
        return this.client.deleteList<Certificate>(certificates, this.url);
    }
}
