import { Injectable } from '@angular/core';
import { removeNullProperties } from '@app/core/functions/object.functions';
import { ApiClientService } from '@app/core/services/api-client.service';
import { MasterCalendar } from '@app/master/models/master-calendar';
import { environment } from '@env/environment';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CalendarApiService {
  private readonly url = environment.backend.calendar;

  constructor(private readonly client: ApiClientService) {}

  public getSchedule(
    masterId: number,
    startTime: string,
    endTime: string,
    serviceId?: number,
  ): Observable<MasterCalendar[]> {
    return this.client
      .get(
        this.getUrl(),
        removeNullProperties({
          professional: masterId?.toString(),
          service: serviceId?.toString(),
          start_datetime: startTime,
          end_datetime: endTime,
        }),
      )
      .pipe(map((raw: MasterCalendar[]) => this.transform(raw)));
  }

  protected getUrl(): string {
    return this.url;
  }

  protected transform(data: MasterCalendar[]): MasterCalendar[] {
    return plainToClass(MasterCalendar, data);
  }
}
