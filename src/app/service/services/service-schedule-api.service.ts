import { Injectable } from '@angular/core';
import {AbstractApiService} from '@app/core/abstract/abstract-api.service';
import {ApiClientService} from '@app/core/services/api-client.service';
import {ServiceSchedule} from '@app/service/models/service-schedule';
import {plainToClass} from 'class-transformer';
import {environment} from '../../../environments/environment';

@Injectable()
export class ServiceScheduleApiService extends AbstractApiService<ServiceSchedule> {

    private readonly url = environment.backend.service_schedule;

    constructor(private client: ApiClientService) {
        super(client);
    }

    protected getUrl(): string {
        return this.url;
    }

    // @ts-ignore
    protected transform(data: ServiceSchedule  | ServiceSchedule[]): ServiceSchedule | ServiceSchedule[] {
        return plainToClass(ServiceSchedule, data);
    }
}
