import { Injectable } from '@angular/core';
import * as DateTimeFunctions from '@app/core/functions/datetime.functions';
import { MasterManagerService } from '@app/core/services';
import { MasterCalendar } from '@app/master/models/master-calendar';
import { CalendarApiService } from '@app/master/services/calendar-api.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class CalendarGeneratorFactoryService {

  constructor(
    private readonly masterManager: MasterManagerService,
    private readonly calendarApi: CalendarApiService,
  ) {
  }

  public getEnabledPeriods(startDate: Date, endDate: Date, masterId?: number): Observable<MasterCalendar[]> {
    return masterId ? this.get(startDate, endDate, masterId) : this.masterManager.getMasterList()
      .pipe(switchMap(list => this.get(startDate, endDate, list[0].id)));
  }

  private get(startDate: Date, endDate: Date, masterId: number): Observable<MasterCalendar[]> {
    return this.calendarApi.getSchedule(
      masterId,
      DateTimeFunctions.getLocalDateString(startDate),
      DateTimeFunctions.getLocalDateString(endDate),
    );
  }
}
