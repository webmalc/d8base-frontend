import {Injectable} from '@angular/core';
import {AbstractReadonlyApiService} from '@app/core/abstract/abstract-readonly-api.service';
import {ApiClientService} from '@app/core/services/api-client.service';
import {Service} from '@app/service/models/service';
import {environment} from '@env/environment';
import {plainToClass} from 'class-transformer';

@Injectable({
    providedIn: 'root'
})
export class ServicesReadonlyApiService extends AbstractReadonlyApiService<Service> {

    private readonly url = environment.backend.services_readonly;

    constructor(protected client: ApiClientService) {
        super(client);
    }

    protected getUrl(): string {
        return this.url;
    }

    // @ts-ignore
    protected transform(results: Service[] | Service): Service | Service[] {
        return plainToClass(Service, results);
    }
}
