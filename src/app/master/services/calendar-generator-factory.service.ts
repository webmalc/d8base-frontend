import { Injectable } from '@angular/core';
import { ProfessionalCalendar } from '@app/api/models/professional-calendar';
import { ScheduleService } from '@app/api/services';
import * as DateTimeFunctions from '@app/core/functions/datetime.functions';
import { MasterManagerService } from '@app/core/services';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class CalendarGeneratorFactoryService {
  constructor(private readonly masterManager: MasterManagerService, private readonly scheduleApi: ScheduleService) {}

  public getEnabledPeriods(startDate: Date, endDate: Date, masterId?: number): Observable<ProfessionalCalendar[]> {
    return masterId
      ? this.get(startDate, endDate, masterId)
      : this.masterManager.getMasterList().pipe(switchMap(list => this.get(startDate, endDate, list[0].id)));
  }

  private get(startDate: Date, endDate: Date, masterId: number): Observable<ProfessionalCalendar[]> {
    return this.scheduleApi.scheduleCalendarList({
      professional: `${masterId}`,
      startDatetime: DateTimeFunctions.getLocalDateString(startDate),
      endDatetime: DateTimeFunctions.getLocalDateString(endDate),
    });
  }
}
