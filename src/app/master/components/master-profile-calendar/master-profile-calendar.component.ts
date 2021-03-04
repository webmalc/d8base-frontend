import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProfessionalSchedule } from '@app/api/models';
import { AccountsService } from '@app/api/services';
import { AbstractSchedule } from '@app/core/models/abstract-schedule';
import { HelperService } from '@app/core/services/helper.service';
import { MasterCalendar } from '@app/master/models/master-calendar';
import { CalendarGeneratorFactoryService } from '@app/master/services/calendar-generator-factory.service';
import { MasterScheduleApiService } from '@app/master/services/master-schedule-api.service';
import ProfessionalPageStateModel from '@app/store/professional-page/professional-page-state.model';
import ProfessionalPageSelectors from '@app/store/professional-page/professional-page.selectors';
import { Select } from '@ngxs/store';
import { BehaviorSubject, concat, Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-master-profile-calendar',
  templateUrl: './master-profile-calendar.component.html',
  styleUrls: ['./master-profile-calendar.component.scss'],
})
export class MasterProfileCalendarComponent implements OnInit {

  @Select(ProfessionalPageSelectors.context)
  public context$: Observable<ProfessionalPageStateModel>;

  public enabledPeriods: Observable<MasterCalendar[]>;
  public schedule$: Observable<ProfessionalSchedule[]>;
  public scheduleEditor = new FormControl();

  private readonly periods: BehaviorSubject<MasterCalendar[]> = new BehaviorSubject<MasterCalendar[]>([]);
  private selectedDate: Date;

  constructor(
    private readonly calendarGeneratorFactory: CalendarGeneratorFactoryService,
    private readonly scheduleApi: MasterScheduleApiService,
    private readonly api: AccountsService,
  ) {
    this.enabledPeriods = this.periods.asObservable();
    this.schedule$ = api.accountsProfessionalScheduleList({}).pipe(
      map(response => response.results),
    );
  }

  public ngOnInit(): void {
    this.context$
      .pipe(first(context => !!context.master))
      .subscribe(context => this.updateEnabledPeriods(new Date(), context.master.id));
  }

  public changeDate(date: Date, masterId: number): void {
    this.selectedDate = date;
    this.updateEnabledPeriods(date, masterId);
  }

  public updateSchedule(masterId: number): void {
    const newSchedules: AbstractSchedule[] = this.scheduleEditor.value ?? [];
    const deleteOld$ = this.schedule$.pipe(
      switchMap(oldSchedules => this.scheduleApi.deleteList(oldSchedules)),
    );

    const createNew$ = this.scheduleApi.createSet(newSchedules.map(schedule => ({
      ...schedule,
      professional: masterId,
      id: null,
    })));

    concat(deleteOld$, createNew$)
      .subscribe({
        next: () => null,
        complete: async () => {
          this.updateEnabledPeriods(this.selectedDate ?? new Date(), masterId);
        },
      });
  }

  private updateEnabledPeriods(startDate: Date, masterId): void {
    this.calendarGeneratorFactory.getEnabledPeriods(
      startDate,
      HelperService.getDate(startDate, 1),
      masterId,
    ).subscribe(list => this.periods.next(list));
  }
}
