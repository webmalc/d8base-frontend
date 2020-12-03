import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {HelperService} from '@app/core/services/helper.service';
import {MasterCalendar} from '@app/master/models/master-calendar';
import {CalendarInterval} from '@app/shared/interfaces/calendar-interval';
import {CalendarService} from '@app/shared/services/calendar.service';
import {environment} from '@env/environment';
import {Observable, Subscription} from 'rxjs';

@Component({
    selector: 'app-calendar-component',
    templateUrl: './calendar-component.component.html',
    styleUrls: ['./calendar-component.component.scss']
})
export class CalendarComponentComponent implements OnInit, OnDestroy {

    @Input() public interval: number = environment.default_calendar_interval;
    @Input() public enabledPeriods: Observable<MasterCalendar[]>;
    @Input() public timezone: string;
    @Output() public newDate: EventEmitter<Date> = new EventEmitter<Date>();
    public calendarIntervals: CalendarInterval[];
    public date: Date = new Date();
    private sub: Subscription;

    constructor(private readonly calendar: CalendarService) {
    }

    public ngOnInit(): void {
        this.sub = this.enabledPeriods.subscribe(list => this.calendarIntervals = this.calendar.generate(this.interval, list));
    }

    public ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    public getTimeStringFromMinutes(minutes: number): string {
        return HelperService.getTimeStringFromMinutes(minutes);
    }

    public changeDate(offset: number): void {
        const newDate = HelperService.getDate(this.date, offset);
        this.newDate.emit(newDate);
        this.date = newDate;
    }
}
