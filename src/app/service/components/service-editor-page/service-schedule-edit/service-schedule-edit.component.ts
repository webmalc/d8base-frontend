import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Service, ServiceSchedule } from '@app/api/models';
import { concat, forkJoin, Observable, of } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { ServiceEditor } from '../service-editor';
import ServiceEditorContext from '../service-editor-context.interface';
import { ServiceEditorDepsService } from '../service-editor-deps.service';

@Component({
  selector: 'app-service-schedule-edit',
  templateUrl: './service-schedule-edit.component.html',
  styleUrls: ['./service-schedule-edit.component.scss'],
})
export class ServiceScheduleEditComponent extends ServiceEditor {

  public schedule$: Observable<ServiceSchedule[]>;
  public showScheduleEditor: boolean;

  constructor(route: ActivatedRoute, deps: ServiceEditorDepsService) {
    super(route, deps);
    this.schedule$ = this.context$.pipe(
      switchMap(context =>
        deps.api.accountsServiceScheduleList({
            service: context.service.id,
          },
        ),
      ),
      map(response => response.results),
      shareReplay(1),
    );
  }

  public submit({ form, service }: ServiceEditorContext): void {
    const { is_base_schedule, schedule } = form.value;
    const newSchedule: ServiceSchedule[] = schedule.map(s => ({ ...s, service: service.id }));

    const deleteOldSchedule$ = this.deps.api.accountsServiceScheduleList({ service: service.id }).pipe(
      switchMap(schedules => schedules.count > 0
        ? forkJoin(schedules.results.map(l => this.deps.api.accountsServiceLocationsDelete(l.id)))
        : of<null>(void 0),
      ),
    );
    const createNewSchedule$ = is_base_schedule
      ? of<any>(void 0)
      : this.deps.api.accountsServiceScheduleSet(newSchedule);

    const newService: Service = {
      ...service,
      is_base_schedule,
    };
    const sources = [
      concat(deleteOldSchedule$, createNewSchedule$),
      this.deps.api.accountsServicesUpdate({ id: service.id, data: newService }),
    ];
    this.saveAndReturn(sources);
  }

  protected createForm(service: Service): FormGroup {
    this.showScheduleEditor = service.is_base_schedule;
    return new FormGroup({
      is_base_schedule: new FormControl(service.is_base_schedule),
      schedule: new FormControl(),
    });
  }
}
