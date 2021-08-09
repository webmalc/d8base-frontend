import { Injectable } from '@angular/core';
import { addMinutes, getTimeStringFromMinutes, stripTime } from '@app/core/functions/datetime.functions';
import { MasterCalendar } from '@app/professional/models/master-calendar';
import { CalendarInterval } from '@app/shared/interfaces/calendar-interval';
import { CalendarUnit } from '@app/shared/interfaces/calendar-unit';
import { environment } from '@env/environment';

interface Interval {
  start: Date;
  end: Date;
}

@Injectable()
export class CalendarService {
  private readonly minutesInDay = 1440;
  private readonly intervals = environment.calendar_day_intervals;
  private readonly minutesInInterval = this.minutesInDay / this.intervals;

  public generate(interval: number, enabledPeriods: MasterCalendar[]): CalendarInterval[] {
    if (!Number.isInteger(this.minutesInInterval / interval)) {
      throw Error('cannot generate calendar with given interval');
    }
    if (!Array.isArray(enabledPeriods) || !enabledPeriods.length) {
      return null;
    }
    const calendar: CalendarInterval[] = [];
    const openedPeriodArray: Interval[] = this.generateEnabledPeriodsArray(enabledPeriods);
    const day = stripTime(openedPeriodArray[0].start);

    for (let intervals = 0; intervals < this.intervals; intervals += 1) {
      const units: CalendarUnit[] = [];
      for (
        let minutes = intervals * this.minutesInInterval;
        minutes <= (intervals + 1) * this.minutesInInterval;
        minutes += interval
      ) {
        units.push({
          minutes,
          enabled: this.isEnabled(openedPeriodArray, day, minutes),
        });
      }
      const startIntervalTimeString = getTimeStringFromMinutes(units[0].minutes);
      const endIntervalTimeString = getTimeStringFromMinutes(units[units.length - 1].minutes - 1);
      calendar.push({ title: `${startIntervalTimeString} - ${endIntervalTimeString}`, units });
    }

    return calendar;
  }

  private isEnabled(enabledPeriods: Interval[], day: Date, minutes: number): boolean {
    const time = addMinutes(day, minutes);
    return enabledPeriods.some(period => time >= period.start && time < period.end);
  }

  private generateEnabledPeriodsArray(enabledPeriods: MasterCalendar[]): Interval[] {
    return enabledPeriods.map(v => ({
      start: new Date(v.start_datetime),
      end: new Date(v.end_datetime),
    }));
  }
}
