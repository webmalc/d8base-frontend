import {Component, OnInit} from '@angular/core';
import {AbstractSchedule} from '@app/core/models/abstract-schedule';
import {HelperService} from '@app/core/services/helper.service';
import MasterProfileContext from '@app/master/interfaces/master-profile-context.interface';
import {MasterCalendar} from '@app/master/models/master-calendar';
import {MasterSchedule} from '@app/master/models/master-schedule';
import {CalendarGeneratorFactoryService} from '@app/master/services/calendar-generator-factory.service';
import {MasterProfileContextService} from '@app/master/services/master-profile-context.service';
import {MasterScheduleApiService} from '@app/master/services/master-schedule-api.service';
import {BehaviorSubject, concat, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-master-profile-calendar',
    templateUrl: './master-profile-calendar.component.html',
    styleUrls: ['./master-profile-calendar.component.scss']
})
export class MasterProfileCalendarComponent implements OnInit {

    public enabledPeriods: Observable<MasterCalendar[]>;
    public schedule$: Observable<MasterSchedule[]>;
    public context$: Observable<MasterProfileContext>;

    private readonly periods: BehaviorSubject<MasterCalendar[]> = new BehaviorSubject<MasterCalendar[]>([]);
    private selectedDate: Date;

    constructor(
        private readonly calendarGeneratorFactory: CalendarGeneratorFactoryService,
        private readonly scheduleApi: MasterScheduleApiService,
        private readonly contextService: MasterProfileContextService
    ) {
        this.enabledPeriods = this.periods.asObservable();
        this.schedule$ = scheduleApi.get().pipe(
            map(response => response.results)
        );
        this.context$ = this.contextService.context$;
    }

    public ngOnInit(): void {
        this.updateEnabledPeriods((new Date()));
    }

    public changeDate(date: Date): void {
        this.selectedDate = date;
        this.updateEnabledPeriods(date);
    }

    public updateSchedule(newSchedules: AbstractSchedule[]): void {
        const deleteOld$ = this.schedule$.pipe(
            switchMap(oldSchedules => this.scheduleApi.deleteList(oldSchedules))
        );

        const masterId = this.contextService.contextSnapshot.master?.id;
        const createNew$ = this.scheduleApi.createSet(newSchedules.map(schedule => ({
            ...schedule,
            professional: masterId,
            id: null
        })));

        concat(deleteOld$, createNew$)
            .subscribe({
                next: () => null,
                complete: async () => {
                    this.updateEnabledPeriods(this.selectedDate ?? new Date());
                }
            });
    }

    private updateEnabledPeriods(startDate: Date): void {
        const masterId = this.contextService.contextSnapshot.master?.id;
        this.calendarGeneratorFactory.getEnabledPeriods(
            startDate,
            HelperService.getDate(startDate, 1),
            masterId
        ).subscribe(list => this.periods.next(list));
    }
}
