import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProfessionalCalendar, ProfessionalSchedule } from '@app/api/models';
import { AccountsService } from '@app/api/services';
import { getOffsetDate } from '@app/core/functions/datetime.functions';
import { AbstractSchedule } from '@app/core/models/abstract-schedule';
import { CalendarGeneratorFactoryService } from '@app/professional/services/calendar-generator-factory.service';
import { MasterScheduleApiService } from '@app/core/services/api/master-schedule-api.service';
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

  public enabledPeriods$: Observable<ProfessionalCalendar[]>;
  public schedule$: Observable<ProfessionalSchedule[]>;
  public scheduleEditor = new FormControl();
  public readonly formControl = new FormControl({ value: null, disabled: true });

  private readonly periods: BehaviorSubject<ProfessionalCalendar[]> = new BehaviorSubject<ProfessionalCalendar[]>(null);
  private selectedDate: Date;

  constructor(
    private readonly calendarGeneratorFactory: CalendarGeneratorFactoryService,
    private readonly scheduleApi: MasterScheduleApiService,
    private readonly api: AccountsService,
  ) {
    this.enabledPeriods$ = this.periods.asObservable();
    this.schedule$ = api.accountsProfessionalScheduleList({}).pipe(map(response => response.results));
  }

  public ngOnInit(): void {
    this.context$
      .pipe(first(context => !!context?.professional))
      .subscribe(context => this.updateEnabledPeriods(new Date(), context.professional.id));
  }

  public changeDate(date: Date, masterId: number): void {
    this.selectedDate = date;
    this.updateEnabledPeriods(date, masterId);
  }

  public updateSchedule(masterId: number): void {
    const newSchedules: AbstractSchedule[] = this.scheduleEditor.value ?? [];
    const deleteOld$ = this.schedule$.pipe(switchMap(oldSchedules => this.scheduleApi.deleteList(oldSchedules)));

    const createNew$ = this.scheduleApi.createSet(
      newSchedules.map(schedule => ({
        ...schedule,
        professional: masterId,
        id: null,
      })),
    );

    concat(deleteOld$, createNew$).subscribe({
      next: () => null,
      complete: async () => {
        this.updateEnabledPeriods(this.selectedDate ?? new Date(), masterId);
      },
    });
  }

  private updateEnabledPeriods(startDate: Date, masterId): void {
    this.calendarGeneratorFactory
      .getEnabledPeriods(startDate, getOffsetDate(startDate, 1), masterId)
      .subscribe(list => this.periods.next(list));
  }
}
