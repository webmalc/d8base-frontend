import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProfessionalSchedule, ServiceList } from '@app/api/models';
import { AccountsService, ServicesService } from '@app/api/services';
import { getProfessionalProfileUrl, getServiceOrderUrl } from '@app/core/functions/navigation.functions';
import { AbstractSchedule } from '@app/core/models/abstract-schedule';
import { CalendarGeneratorFactoryService } from '@app/professional/services/calendar-generator-factory.service';
import ProfessionalPageStateModel from '@app/store/professional-page/professional-page-state.model';
import ProfessionalPageSelectors from '@app/store/professional-page/professional-page.selectors';
import { Select } from '@ngxs/store';
import { concat, forkJoin, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-professional-schedule-page',
  templateUrl: './professional-schedule-page.component.html',
  styleUrls: ['./professional-schedule-page.component.scss'],
})
export class ProfessionalSchedulePageComponent {
  @Select(ProfessionalPageSelectors.context)
  public context$: Observable<ProfessionalPageStateModel>;

  public services$: Observable<ServiceList[]>;
  public schedule$: Observable<ProfessionalSchedule[]>;
  public serviceId: number;

  public readonly scheduleEditor = new FormControl();

  constructor(
    private readonly calendarGeneratorFactory: CalendarGeneratorFactoryService,
    private readonly api: AccountsService,
    private readonly servicesApi: ServicesService,
  ) {
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

    concat(deleteOld$, createNew$).subscribe();
  }

  public setService(data: { value: ServiceList }): void {
    this.serviceId = data.value.id;
  }
}
