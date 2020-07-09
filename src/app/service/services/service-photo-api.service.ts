import { Injectable } from '@angular/core';
import {AbstractApiService} from '@app/core/abstract/abstract-api.service';
import {ApiClientService} from '@app/core/services/api-client.service';
import {ServicePhoto} from '@app/service/models/service-photo';
import {plainToClass} from 'class-transformer';
import {environment} from '../../../environments/environment';

@Injectable()
export class ServicePhotoApiService extends AbstractApiService<ServicePhoto> {

    private readonly url = environment.backend.service_photo;

    constructor(protected client: ApiClientService) {
        super(client);
    }

    protected getUrl(): string {
        return this.url;
    }

    // @ts-ignore
    protected transform(data: ServicePhoto | ServicePhoto[]): ServicePhoto | ServicePhoto[] {
        return plainToClass(ServicePhoto, data);
    }
}
