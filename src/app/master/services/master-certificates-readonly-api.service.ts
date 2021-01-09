import {Injectable} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {Certificate} from '@app/master/models/certificate';
import {environment} from '@env/environment';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
    providedIn: 'root',
})
export class MasterCertificatesReadonlyApiService {

    private readonly url = environment.backend.master_list;

    constructor(private readonly client: ApiClientService) {
    }

    public getByMasterId(id: number): Observable<ApiListResponseInterface<Certificate>> {
        return this.client.get<{ certificates: Certificate[] }>(this.getUrl() + id.toString()).pipe(
            map(data => ({count: data.certificates.length, results: data.certificates, next: null, previous: null})),
        );
    }

    protected getUrl(): string {
        return this.url;
    }

    // @ts-ignore
    protected transform(data: Certificate | Certificate[]): Certificate | Certificate[] {
        return plainToClass(Certificate, data);
    }
}
