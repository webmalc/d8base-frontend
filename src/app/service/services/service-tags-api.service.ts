import { Injectable } from '@angular/core';
import {AbstractApiService} from '@app/core/abstract/abstract-api.service';
import {ApiClientService} from '@app/core/services/api-client.service';
import {ServiceTag} from '@app/service/models/service-tag';
import {plainToClass} from 'class-transformer';
import {environment} from '../../../environments/environment';

@Injectable()
export class ServiceTagsApiService extends AbstractApiService<ServiceTag> {

    private readonly url = environment.backend.service_tag;

    constructor(protected client: ApiClientService) {
        super(client);
    }

    protected getUrl(): string {
        return this.url;
    }

    // @ts-ignore
    protected transform(data: ServiceTag | ServiceTag[]): ServiceTag | ServiceTag[] {
        return plainToClass(ServiceTag, data);
    }

}
