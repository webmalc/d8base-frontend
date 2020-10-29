import {Injectable} from '@angular/core';
import {AbstractApiService} from '@app/core/abstract/abstract-api.service';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ApiServiceInterface} from '@app/core/interfaces/api-service-interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {Certificate} from '@app/master/models/certificate';
import {environment} from '@env/environment';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';

@Injectable()
export class CertificatesApiService extends AbstractApiService<Certificate> implements ApiServiceInterface<Certificate> {

    private readonly url = environment.backend.certificates;

    constructor(protected client: ApiClientService) {
        super(client);
    }

    public getByMasterId(
        masterId: number,
        params?: { [param: string]: string | string[]; }
    ): Observable<ApiListResponseInterface<Certificate>> {
        return super.get({professional: masterId?.toString(10), ...params});
    }

    protected getUrl(): string {
        return this.url;
    }

    // @ts-ignore
    protected transform(data: Certificate | Certificate[]): Certificate | Certificate[] {
        return plainToClass(Certificate, data);
    }
}
