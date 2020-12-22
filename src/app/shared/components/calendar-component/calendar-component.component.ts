import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {HelperService} from '@app/core/services/helper.service';
import {MasterCalendar} from '@app/master/models/master-calendar';
import {CalendarInterval} from '@app/shared/interfaces/calendar-interval';
import {CalendarUnit} from '@app/shared/interfaces/calendar-unit';
import {environment} from '@env/environment';
import {CalendarService} from './calendar.service';

function getCurrentDay(): Date {
    return new Date(new Date().setHours(0, 0, 0, 0));
}

@Component({
    selector: 'app-calendar-component',
    templateUrl: './calendar-component.component.html',
    styleUrls: ['./calendar-component.component.scss'],
    providers: [
        CalendarService,
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CalendarComponentComponent),
            multi: true
        }
    ]
})
export class CalendarComponentComponent implements ControlValueAccessor {

    @Input() public interval: number = environment.default_calendar_interval;
    @Input() public timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
    @Input() public disabled: boolean;
    @Output() public newDate: EventEmitter<Date> = new EventEmitter<Date>();
    public calendarIntervals: CalendarInterval[];

    // currently viewed day:
    public date: Date = getCurrentDay();

    // if user made a choice, selected date and time:
    public selectedDate?: Date;
    public selectedMinutes?: number;

    private onChange: (value: Date) => void;
    private onTouched: () => void;

    constructor(private readonly calendar: CalendarService) {
    }

    @Input()
    public set enabledPeriods(list: MasterCalendar[]) {
        this.calendarIntervals = this.calendar.generate(this.interval, list);
    }

    /**
     * Choose a specific time from the schedule
     */
    public setStartTime(unit: CalendarUnit): void {
        const offset = unit.minutes * 60000; // minutes to milliseconds. TODO: extract to function or use a library
        const date = new Date(this.date.getTime() + offset);
        this.selectedMinutes = unit.minutes;
        this.selectedDate = new Date(this.date);
        this.onChange(date);
    }

    public writeValue(date: Date): void {
        if (!date) {
            this.date = getCurrentDay();
            this.selectedMinutes = null;
            this.selectedDate = null;

            return;
        }
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);
        this.date = startDate;
        this.selectedDate = startDate;
        // TODO: extract to function or use a library
        this.selectedMinutes = Math.floor((date.getTime() - startDate.getTime()) / 60000);
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
        const newDate = HelperService.getDate(this.date, offset);
        this.newDate.emit(newDate);
        this.date = newDate;
    }

    public getUnitColor(unit: CalendarUnit): string {
        // show currently selected interval as green
        if (this.selectedDate?.getDate() === this.date.getDate() && unit.minutes === this.selectedMinutes) {
            return 'success';
        }

        // show available intervals in primary color
        return unit.enabled ? 'primary' : 'light';
    }
}
