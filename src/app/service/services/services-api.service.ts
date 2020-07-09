import { Injectable } from '@angular/core';
import {AbstractApiService} from '@app/core/abstract/abstract-api.service';
import {ApiClientService} from '@app/core/services/api-client.service';
import {Service} from '@app/service/models/service';
import {plainToClass} from 'class-transformer';
import {environment} from '../../../environments/environment';

@Injectable()
export class ServicesApiService extends AbstractApiService<Service> {

    private readonly url = environment.backend.services;

    constructor(protected client: ApiClientService) {
        super(client);
    }

    protected getUrl(): string {
        return this.url;
    }

    // @ts-ignore
    protected transform(data: Service | Service[]): Service | Service[] {
        return plainToClass(Service, data);
    }
}
