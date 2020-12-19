import {Injectable} from '@angular/core';
import {AbstractApiService} from '@app/core/abstract/abstract-api.service';
import {ApiClientService} from '@app/core/services/api-client.service';
import {ServiceSchedule} from '@app/service/models/service-schedule';
import {environment} from '@env/environment';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class ServiceScheduleApiService extends AbstractApiService<ServiceSchedule> {

    private readonly url = environment.backend.service_schedule;
    private readonly setUrl = environment.backend.service_schedule_set;

    constructor(protected readonly client: ApiClientService) {
        super(client);
    }

    public createSet(data: ServiceSchedule[]): Observable<ServiceSchedule[]> {
        return this.client.post<ServiceSchedule[], ServiceSchedule[]>(this.setUrl, data).pipe(
            map(raw => plainToClass(ServiceSchedule, raw))
        );
    }

    protected getUrl(): string {
        return this.url;
    }

    // @ts-ignore
    protected transform(data: ServiceSchedule | ServiceSchedule[]): ServiceSchedule | ServiceSchedule[] {
        return plainToClass(ServiceSchedule, data);
    }
}
