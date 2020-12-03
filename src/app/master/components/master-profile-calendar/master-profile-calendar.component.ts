import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HelperService} from '@app/core/services/helper.service';
import {MasterCalendar} from '@app/master/models/master-calendar';
import {CalendarGeneratorFactoryService} from '@app/master/services/calendar-generator-factory.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
    selector: 'app-master-profile-calendar',
    templateUrl: './master-profile-calendar.component.html',
    styleUrls: ['./master-profile-calendar.component.scss']
})
export class MasterProfileCalendarComponent implements OnInit {

    public enabledPeriods: Observable<MasterCalendar[]>;
    public timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
    private readonly periods: BehaviorSubject<MasterCalendar[]> = new BehaviorSubject<MasterCalendar[]>([]);
    private masterId: number;

    constructor(private readonly calendarGeneratorFactory: CalendarGeneratorFactoryService, private readonly route: ActivatedRoute) {
        this.enabledPeriods = this.periods.asObservable();
    }

    public ngOnInit(): void {
        this.masterId = parseInt(this.route.snapshot.paramMap.get('master-id'), 10);
        this.updateEnabledPeriods((new Date()));
    }

    public changeDate(date: Date): void {
        this.updateEnabledPeriods(date);
    }

    private updateEnabledPeriods(startDate: Date): void {
        this.calendarGeneratorFactory.getEnabledPeriods(
            startDate,
            HelperService.getDate(startDate, 1),
            this.masterId
        ).subscribe(list => this.periods.next(list));
    }
}
