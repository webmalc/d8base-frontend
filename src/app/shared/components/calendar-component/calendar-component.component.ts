import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ProfessionalCalendar } from '@app/api/models';
import { ScheduleService } from '@app/api/services';
import { addDays, getCurrentDay, getLocalDateString, stripTime } from '@app/core/functions/datetime.functions';
import { environment } from '@env/environment';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DatePickerPopoverComponent } from '../date-picker-popover/date-picker-popover.component';
import { CalendarInterval } from './calendar-interval';
import { CalendarUnit } from './calendar-unit';
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
  public disabled: boolean;
  public calendarIntervals$: Observable<CalendarInterval[]>;
  public selectedDatetime: Date;
  public readonly currentlyViewedDate$ = new BehaviorSubject<Date>(new Date());

  private readonly professionalId$ = new BehaviorSubject<number>(NaN);
  private readonly serviceId$ = new BehaviorSubject<number>(NaN);

  private onChange: (value: Date) => void;
  private onTouched: () => void;

  constructor(
    private readonly calendar: CalendarService,
    private readonly modalController: ModalController,
    private readonly scheduleApi: ScheduleService,
  ) {
    this.calendarIntervals$ = this.getCalendars();
  }

  @Input()
  public set professionalId(professionalId: number) {
    this.professionalId$.next(professionalId);
  }

  @Input()
  public set serviceId(serviceId: number) {
    this.serviceId$.next(serviceId);
  }

  public async pickDate(): Promise<void> {
    const modal = await this.modalController.create({
      component: DatePickerPopoverComponent,
      componentProps: {
        professionalId: this.professionalId$.value,
        serviceId: this.serviceId$.value,
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.currentlyViewedDate$.next(data);
    }
  }

  public setDatetime(unit: CalendarUnit): void {
    this.selectedDatetime = unit.datetime;
    this.onChange(this.selectedDatetime);
  }

  public writeValue(date: Date): void {
    if (!date) {
      this.currentlyViewedDate$.next(getCurrentDay());
      this.selectedDatetime = null;
      return;
    }
    this.selectedDatetime = date;
    this.currentlyViewedDate$.next(stripTime(date));
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
    const newDate = addDays(this.currentlyViewedDate$.value, offset);
    this.currentlyViewedDate$.next(newDate);
  }

  public setDate(event: CustomEvent): void {
    const date: string = event.detail.value;
    if (!date) {
      return;
    }
    const newDate = new Date(date);
    this.currentlyViewedDate$.next(newDate);
  }

  public getUnitColor(unit: CalendarUnit): string {
    return unit.enabled ? 'secondary' : 'medium';
  }

  public getUnitFill(unit: CalendarUnit): string {
    return unit.datetime.getTime() === this.selectedDatetime?.getTime() ? 'solid' : 'outline';
  }

  private getCalendars(): Observable<CalendarInterval[]> {
    return combineLatest([this.currentlyViewedDate$, this.professionalId$, this.serviceId$]).pipe(
      switchMap(([startDate, professionalId, serviceId]) => {
        const endDate = addDays(startDate, 1);
        return !professionalId || !serviceId
          ? of<ProfessionalCalendar[]>(null)
          : this.scheduleApi.scheduleCalendarList({
              service: serviceId?.toString(),
              professional: professionalId?.toString(),
              startDatetime: getLocalDateString(startDate),
              endDatetime: getLocalDateString(endDate),
            });
      }),
      map(list => this.calendar.generate(CALENDAR_INTERVAL, list)),
    );
  }
}
