import {Injectable} from '@angular/core';
import {AbstractApiService} from '@app/core/abstract/abstract-api.service';
import {ApiClientService} from '@app/core/services/api-client.service';
import {MasterSchedule} from '@app/master/models/master-schedule';
import {environment} from '@env/environment';
import {plainToClass} from 'class-transformer';

@Injectable({
    providedIn: 'root'
})
export class MasterScheduleApiService extends AbstractApiService<MasterSchedule> {

    private readonly url = environment.backend.master_schedule;

    constructor(protected readonly client: ApiClientService) {
        super(client);
    }

    protected getUrl(): string {
        return this.url;
    }

    // @ts-ignore
    protected transform(data: (MasterSchedule | MasterSchedule[])): (MasterSchedule | MasterSchedule[]) {
        return plainToClass(MasterSchedule, data);
    }
}
