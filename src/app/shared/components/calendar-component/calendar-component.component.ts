import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ProfessionalCalendar } from '@app/api/models';
import { addDays, getCurrentDay, stripTime } from '@app/core/functions/datetime.functions';
import { CalendarInterval } from '@app/shared/interfaces/calendar-interval';
import { CalendarUnit } from '@app/shared/interfaces/calendar-unit';
import { environment } from '@env/environment';
import { CalendarService } from './calendar.service';

const CALENDAR_INTERVAL = environment.default_calendar_interval;

@Component({
  selector: 'app-calendar-component',
  templateUrl: './calendar-component.component.html',
  styleUrls: ['./calendar-component.component.scss'],
  providers: [
    CalendarService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarComponentComponent),
      multi: true,
    },
  ],
})
export class CalendarComponentComponent implements ControlValueAccessor {
  @Output()
  public dateChanged: EventEmitter<Date> = new EventEmitter<Date>();

  public disabled: boolean;
  public calendarIntervals: CalendarInterval[];
  public isLoadingEnabledPeriods: boolean = false;

  public viewedDay: Date;
  public selectedDatetime: Date;

  private onChange: (value: Date) => void;
  private onTouched: () => void;

  constructor(private readonly calendar: CalendarService) {}

  @Input()
  public set enabledPeriods(list: ProfessionalCalendar[]) {
    this.isLoadingEnabledPeriods = Boolean(list);
    this.calendarIntervals = this.calendar.generate(CALENDAR_INTERVAL, list);
  }

  public setDatetime(unit: CalendarUnit): void {
    this.selectedDatetime = unit.datetime;
    this.onChange(this.selectedDatetime);
  }

  public writeValue(date: Date): void {
    if (!date) {
      this.viewedDay = getCurrentDay();
      this.dateChanged.emit(this.viewedDay);
      this.selectedDatetime = null;
      return;
    }
    this.viewedDay = stripTime(date);
    this.selectedDatetime = date;
    this.dateChanged.emit(this.viewedDay);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public shiftDate(offset: number): void {
    if (!this.viewedDay) {
      return;
    }
    const newDate = addDays(this.viewedDay, offset);
    this.dateChanged.emit(newDate);
    this.viewedDay = newDate;
  }

  public setDate(event: CustomEvent): void {
    const date: string = event.detail.value;
    if (!date) {
      return;
    }
    const newDate = new Date(date);
    this.dateChanged.emit(newDate);
    this.viewedDay = newDate;
  }

  public getUnitColor(unit: CalendarUnit): string {
    return unit.enabled ? 'secondary' : 'medium';
  }

  public getUnitFill(unit: CalendarUnit): string {
    return unit.datetime.getTime() === this.selectedDatetime?.getTime() ? 'solid' : 'outline';
  }
}
