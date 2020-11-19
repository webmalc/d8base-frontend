import {Injectable} from '@angular/core';
import {AbstractApiService} from '@app/core/abstract/abstract-api.service';
import {ApiClientService} from '@app/core/services/api-client.service';
import {ServiceSchedule} from '@app/service/models/service-schedule';
import {environment} from '@env/environment';
import {plainToClass} from 'class-transformer';

@Injectable()
export class ServiceScheduleApiService extends AbstractApiService<ServiceSchedule> {

    private readonly url = environment.backend.service_schedule;

    constructor(protected readonly client: ApiClientService) {
        super(client);
    }

    protected getUrl(): string {
        return this.url;
    }

    // @ts-ignore
    protected transform(data: ServiceSchedule | ServiceSchedule[]): ServiceSchedule | ServiceSchedule[] {
        return plainToClass(ServiceSchedule, data);
    }
}
