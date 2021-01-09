import { Injectable } from '@angular/core';
import { HelperService } from '@app/core/services/helper.service';
import { MasterCalendar } from '@app/master/models/master-calendar';
import { CalendarInterval } from '@app/shared/interfaces/calendar-interval';
import { CalendarUnit } from '@app/shared/interfaces/calendar-unit';
import { environment } from '@env/environment';

@Injectable()
export class CalendarService {

  private readonly minutesInDay = 1440;
  private readonly intervals = environment.calendar_day_intervals;
  private readonly minutesInInterval = this.minutesInDay / this.intervals;

  public generate(interval: number, enabledPeriods: MasterCalendar[]): CalendarInterval[] {
    if (!Number.isInteger(this.minutesInInterval / interval)) {
      throw Error('cannot generate calendar with given interval');
    }
    if (!enabledPeriods) {
      return null;
    }
    const calendar: CalendarInterval[] = [];
    const openedPeriodArray: { start: number, end: number }[] = this.generateEnabledPeriodsArray(enabledPeriods);
    for (let i = 0; i < this.intervals; i += 1) {
      const units: CalendarUnit[] = [];
      for (let j = i * this.minutesInInterval; j <= (i + 1) * this.minutesInInterval; j += interval) {
        units.push({
          minutes: j,
          enabled: this.checkIfTimeDisabled(openedPeriodArray, j),
        });
      }
      const startIntervalTimeString = HelperService.getTimeStringFromMinutes(units[0].minutes);
      const endIntervalTimeString = HelperService.getTimeStringFromMinutes(units[units.length - 1].minutes - 1);
      calendar.push({ title: `${startIntervalTimeString} - ${endIntervalTimeString}`, units });
    }

    return calendar;
  }

  private checkIfTimeDisabled(enabledPeriods: { start: number, end: number }[], time: number): boolean {
    for (const period of enabledPeriods) {
      if (time > period.start && time < period.end) {
        return true;
      }
    }

    return false;
  }

  private generateEnabledPeriodsArray(enabledPeriods: MasterCalendar[]): { start: number, end: number }[] {
    const res = [];
    enabledPeriods.forEach(v => {
      const startTime = new Date(v.start_datetime);
      const endTime = new Date(v.end_datetime);
      res.push({ start: startTime.getHours() * 60 + startTime.getMinutes(), end: endTime.getHours() * 60 + endTime.getMinutes() });
    });

    return res;
  }
}
