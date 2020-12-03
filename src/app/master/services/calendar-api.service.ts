import {Injectable} from '@angular/core';
import {ApiClientService} from '@app/core/services/api-client.service';
import {HelperService} from '@app/core/services/helper.service';
import {MasterCalendar} from '@app/master/models/master-calendar';
import {environment} from '@env/environment';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class CalendarApiService {

    private readonly url = environment.backend.calendar;

    constructor(private readonly client: ApiClientService) {
    }

    public getSchedule(
        masterId: number,
        startTime: string,
        endTime: string,
        serviceId?: number
    ): Observable<MasterCalendar[]> {
        return this.client.get(this.getUrl(), HelperService.clear(
            {professional: masterId?.toString(), service: serviceId?.toString(), start_datetime: startTime, end_datetime: endTime}
        )).pipe(
            map((raw: MasterCalendar[]) => this.transform(raw))
        );
    }

    protected getUrl(): string {
        return this.url;
    }

    // @ts-ignore
    protected transform(data: MasterCalendar[]): MasterCalendar[] {
        return plainToClass(MasterCalendar, data);
    }
}
