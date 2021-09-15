import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProfessionalCalendar, ProfessionalSchedule, ServiceList } from '@app/api/models';
import { AccountsService, ServicesService } from '@app/api/services';
import { getOffsetDate } from '@app/core/functions/datetime.functions';
import { getProfessionalProfileUrl, getServiceOrderUrl } from '@app/core/functions/navigation.functions';
import { AbstractSchedule } from '@app/core/models/abstract-schedule';
import { CalendarGeneratorFactoryService } from '@app/professional/services/calendar-generator-factory.service';
import ProfessionalPageStateModel from '@app/store/professional-page/professional-page-state.model';
import ProfessionalPageSelectors from '@app/store/professional-page/professional-page.selectors';
import { Select } from '@ngxs/store';
import { BehaviorSubject, concat, forkJoin, Observable } from 'rxjs';
import { filter, first, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-master-profile-calendar',
  templateUrl: './master-profile-calendar.component.html',
  styleUrls: ['./master-profile-calendar.component.scss'],
})
export class MasterProfileCalendarComponent implements OnInit {
  @Select(ProfessionalPageSelectors.context)
  public context$: Observable<ProfessionalPageStateModel>;

  public services$: Observable<ServiceList[]>;
  public enabledPeriods$: Observable<ProfessionalCalendar[]>;
  public schedule$: Observable<ProfessionalSchedule[]>;
  public serviceId: number;

  public readonly scheduleEditor = new FormControl();
  public readonly calendarViewer = new FormControl({ value: null, disabled: true });

  private readonly periods: BehaviorSubject<ProfessionalCalendar[]> = new BehaviorSubject<ProfessionalCalendar[]>(null);
  private selectedDate: Date;

  constructor(
    private readonly calendarGeneratorFactory: CalendarGeneratorFactoryService,
    private readonly api: AccountsService,
    private readonly servicesApi: ServicesService,
  ) {
    this.enabledPeriods$ = this.periods.asObservable();
    this.schedule$ = api.accountsProfessionalScheduleList({}).pipe(map(response => response.results));
    this.services$ = this.context$.pipe(
      filter(x => Boolean(x)),
      switchMap(context => this.servicesApi.servicesServicesList({ professional: context.professional.id })),
      map(response => response.results),
    );
  }

  public get serviceOrderUrl(): string {
    return getServiceOrderUrl(this.serviceId);
  }

  public professionalProfileUrl(professionalId: number): string {
    return getProfessionalProfileUrl(professionalId);
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
    const deleteOld$ = this.schedule$.pipe(
      switchMap(oldSchedules =>
        forkJoin(oldSchedules.map(schedule => this.api.accountsProfessionalScheduleDelete(schedule.id))),
      ),
    );

    const createNew$ = this.api.accountsProfessionalScheduleSet(
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

  public setService(data: { value: ServiceList }): void {
    this.serviceId = data.value.id;
  }

  private updateEnabledPeriods(startDate: Date, masterId): void {
    this.calendarGeneratorFactory
      .getEnabledPeriods(startDate, getOffsetDate(startDate, 1), masterId)
      .subscribe(list => this.periods.next(list));
  }
}
