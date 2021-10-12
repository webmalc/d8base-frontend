import {Injectable} from '@angular/core';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import add from 'date-fns/add';
import format from 'date-fns/format';
import differenceInMonths from 'date-fns/differenceInMonths';
import {CalendarDateInterface} from '@app/core/interfaces/calendar-date-interface';
import {ScheduleService} from '@app/api/services/schedule.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ProfessionalCalendarByDays} from '@app/api/models/professional-calendar-by-days';


@Injectable({
  providedIn: 'root'
})
export class CalendarGeneratorService {

  public constructor(private readonly api: ScheduleService) {
  }

  public generate(
    fromMonth: number,
    fromYear: number,
    monthLen: number,
    professional: string,
    service?: string | null,
  ): Observable<CalendarDateInterface[][]> {
    const toMonth = add(new Date(fromYear, fromMonth), {months: monthLen}).getMonth();
    const toYear = add(new Date(fromYear, fromMonth), {months: monthLen}).getFullYear();
    return this.api.scheduleCalendarDays(
      {
        startDatetime: this.getDateTime(fromMonth, fromYear, true),
        endDatetime: this.getDateTime(toMonth, toYear, false),
        professional,
        service
      }).pipe(
      map(data => {
        const formattedData = this.format(data);
        const res: CalendarDateInterface[][] = [];
        for (let i = 0; i <= differenceInMonths(new Date(toYear, toMonth - 1), new Date(fromYear, fromMonth - 1)); ++i) {
          const nowMonth = add(new Date(fromYear, fromMonth - 1), {months: i});
          const days: CalendarDateInterface[] = [];
          for (let j = 0; j < getDaysInMonth(new Date(nowMonth.getFullYear(), nowMonth.getMonth())); ++j) {
            const nowDay = add(new Date(nowMonth.getFullYear(), nowMonth.getMonth()), {days: j});
            days.push({
              date: nowDay,
              isAvailable: formattedData.hasOwnProperty(format(nowDay, 'y-MM-dd')),
              selected: false
            });
          }
          res.push(days);
        }

        return res;
      })
    );
  }

  private format(data: Array<ProfessionalCalendarByDays>): object {
    const res = {};
    data.forEach(el => res[el.date] = el.slots);
    return res;
  }

  private getDateTime(month: number, year: number, isFirstDay: boolean): string {
    const date = new Date(year, month - 1);
    console.log(date);

    return isFirstDay
      ? `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-01`
      : `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + getDaysInMonth(date)).slice(-2)}`;
  }
}
