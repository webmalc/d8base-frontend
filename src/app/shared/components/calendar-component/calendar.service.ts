import { Injectable } from '@angular/core';
import { ProfessionalCalendar } from '@app/api/models';
import { addMinutes, stripTime } from '@app/core/functions/datetime.functions';
import { environment } from '@env/environment';
import { CalendarInterval } from './calendar-interval';
import { CalendarUnit } from './calendar-unit';

interface Interval {
  start: Date;
  end: Date;
}

@Injectable()
export class CalendarService {
  private readonly minutesInDay = 1440;
  private readonly intervals = environment.calendar_day_intervals;
  private readonly minutesInInterval = this.minutesInDay / this.intervals;

  // TODO simplify logic
  public generate(stepSize: number, enabledPeriods: ProfessionalCalendar[]): CalendarInterval[] {
    if (!Number.isInteger(this.minutesInInterval / stepSize)) {
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
        minutes += stepSize
      ) {
        units.push({
          datetime: addMinutes(day, minutes),
          enabled: this.isEnabled(openedPeriodArray, day, minutes),
        });
      }
      const startIntervalTimeString = units[0].datetime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const endIntervalTimeString = addMinutes(units[units.length - 1].datetime, -1).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      if (units.filter(x => x.enabled).length > 0) {
        calendar.push({ title: `${startIntervalTimeString} - ${endIntervalTimeString}`, units });
      }
    }

    return calendar;
  }

  private isEnabled(enabledPeriods: Interval[], day: Date, minutes: number): boolean {
    const time = addMinutes(day, minutes);
    return enabledPeriods.some(period => time >= period.start && time < period.end);
  }

  private generateEnabledPeriodsArray(enabledPeriods: ProfessionalCalendar[]): Interval[] {
    return enabledPeriods.map(v => ({
      start: new Date(v.start_datetime),
      end: new Date(v.end_datetime),
    }));
  }
}
