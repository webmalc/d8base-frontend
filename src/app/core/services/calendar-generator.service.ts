import { Injectable } from '@angular/core';
import { getDaysInMonth, add, format, differenceInMonths } from 'date-fns';
import { CalendarDateInterface } from '@app/core/interfaces/calendar-date-interface';
import { ScheduleService } from '@app/api/services/schedule.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProfessionalCalendarByDays } from '@app/api/models/professional-calendar-by-days';
import { getMonthFirstDay, getMonthLastDay } from '@app/core/functions/datetime.functions';
import { ProfessionalCalendar } from '@app/api/models';

@Injectable()
export class CalendarGeneratorService {
  constructor(private readonly api: ScheduleService) {}

  public generate(
    date: Date,
    monthLen: number,
    professional: string,
    service?: string | null,
  ): Observable<CalendarDateInterface[][]> {
    const fromMonth = date.getMonth();
    const fromYear = date.getFullYear();
    const toMonth = add(new Date(fromYear, fromMonth), { months: monthLen }).getMonth();
    const toYear = add(new Date(fromYear, fromMonth), { months: monthLen }).getFullYear();
    return this.api
      .scheduleCalendarDays({
        startDatetime: getMonthFirstDay(fromMonth, fromYear),
        endDatetime: getMonthLastDay(toMonth, toYear),
        professional,
        service,
      })
      .pipe(
        map(data => {
          const intervalsHashtable = this.format(data);
          const res: CalendarDateInterface[][] = [];
          for (
            let i = 0;
            i <= differenceInMonths(new Date(toYear, toMonth - 1), new Date(fromYear, fromMonth - 1));
            ++i
          ) {
            const nowMonth = add(new Date(fromYear, fromMonth - 1), { months: i });
            const days: CalendarDateInterface[] = [];
            for (let j = 0; j < getDaysInMonth(new Date(nowMonth.getFullYear(), nowMonth.getMonth())); ++j) {
              const nowDay = add(new Date(nowMonth.getFullYear(), nowMonth.getMonth()), { days: j });
              days.push({
                date: nowDay,
                isAvailable: intervalsHashtable.hasOwnProperty(format(nowDay, 'y-MM-dd')),
                selected: false,
              });
            }
            res.push(days);
          }

          return res;
        }),
      );
  }

  private format(data: ProfessionalCalendarByDays[]): { [key: string]: ProfessionalCalendar[] } {
    const res = {};
    data.forEach(el => (res[el.date] = el.slots));
    return res;
  }
}
