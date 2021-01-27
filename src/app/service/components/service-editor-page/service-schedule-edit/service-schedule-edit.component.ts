import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '@app/api/models';
import { AccountsService } from '@app/api/services';
import { ServiceEditor } from '../service-editor';
import ServiceEditorContext from '../service-editor-context.interface';
import { ServiceEditorDepsService } from '../service-editor-deps.service';

@Component({
  selector: 'app-service-schedule-edit',
  templateUrl: './service-schedule-edit.component.html',
  styleUrls: ['./service-schedule-edit.component.scss'],
})
export class ServiceScheduleEditComponent extends ServiceEditor {
  constructor(route: ActivatedRoute, deps: ServiceEditorDepsService) {
    super(route, deps);
  }

  public submit({ form, service }: ServiceEditorContext): void {
    const { is_base_schedule } = form.value;

    const newService: Service = {
      ...service,
      is_base_schedule,
    };
    this.saveAndReturn(newService);
  }

  protected createForm(service: Service): FormGroup {
    return new FormGroup({
      is_base_schedule: new FormControl(false),
    });
  }
}
