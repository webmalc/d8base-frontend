import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfessionalSchedule, Service, ServiceSchedule } from '@app/api/models';
import { Observable } from 'rxjs';
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
            service: context.service.id.toString(),
          },
        ),
      ),
      map(response => response.results),
      shareReplay(1),
    );
  }

  public submit({ form, service }: ServiceEditorContext): void {
    const { is_base_schedule } = form.value;

    const newService: Service = {
      ...service,
      is_base_schedule,
    };
    this.saveAndReturn(newService);
  }

  public toggleScheduleEditor(showScheduleEditor: boolean) {
    this.showScheduleEditor = showScheduleEditor;
  }

  protected createForm(service: Service): FormGroup {
    this.showScheduleEditor = service.is_base_schedule;
    return new FormGroup({
      is_base_schedule: new FormControl(service.is_base_schedule),
    });
  }
}
