import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { addDays, getCurrentDay, stripTime, getMilliseconds } from '@app/core/functions/datetime.functions';
import { HelperService } from '@app/core/services/helper.service';
import { MasterCalendar } from '@app/master/models/master-calendar';
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

  @Input() public timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
  @Input() public serviceDuration: number;
  @Input() public disabled: boolean;
  @Input() public initialDate: Date;
  @Output() public newDate: EventEmitter<Date> = new EventEmitter<Date>();
  public calendarIntervals: CalendarInterval[];
  public isLoadingEnabledPeriods: boolean = false;

  // currently viewed day:
  public date: Date;

  // if user made a choice, selected date and time:
  public selectedDate: Date;
  public selectedStartTime: number;
  public selectedEndTime: number;

  private onChange: (value: Date) => void;
  private onTouched: () => void;


  constructor(private readonly calendar: CalendarService) {
  }

  @Input()
  public set enabledPeriods(list: MasterCalendar[]) {
    this.isLoadingEnabledPeriods = Boolean(list);
    this.calendarIntervals = this.calendar.generate(CALENDAR_INTERVAL, list);
  }

  /**
   * Choose a specific time from the schedule
   */
  public setStartTime(unit: CalendarUnit): void {
    const minutes = unit.minutes;
    this.selectTimeInterval(minutes);
    this.onChange(new Date(this.date.getTime() + getMilliseconds({ minutes })));
  }

  public writeValue(date: Date): void {
    if (!date) {
      this.date = getCurrentDay();
      this.newDate.emit(this.date);
      this.selectedStartTime = null;
      this.selectedEndTime = null;
      this.selectedDate = null;
      return;
    }
    const startDate = stripTime(date);
    this.date = startDate;
    this.newDate.emit(this.date);

    // TODO: extract to function or use a library
    const minutes = Math.floor((date.getTime() - startDate.getTime()) / 60000);
    this.selectTimeInterval(minutes);
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

  public getTimeStringFromMinutes(minutes: number): string {
    return HelperService.getTimeStringFromMinutes(minutes);
  }

  /**
   * Change currently viewed day
   */
  public changeDate(offset: number): void {
    const newDate = addDays(this.date, offset);
    this.newDate.emit(newDate);
    this.date = newDate;
  }

  public getUnitColor(unit: CalendarUnit): string {
    const isCurrentDaySelected = this.selectedDate?.getDate() === this.date.getDate();
    const isTimeInSelectedInterval = unit.minutes >= this.selectedStartTime && unit.minutes < this.selectedEndTime;

    // show currently selected interval as 'success'
    // TODO show as red if can't fit
    if (isCurrentDaySelected && isTimeInSelectedInterval) {
      return 'success';
    }

    // show available intervals in primary color
    return unit.enabled ? 'primary' : 'light';
  }

  private selectTimeInterval(minutes: number): void {
    this.selectedDate = new Date(this.date);
    this.selectedStartTime = minutes;
    this.selectedEndTime = this.selectedStartTime + this.serviceDuration;
  }
}
