import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Service } from '@app/api/models';
import { ServiceType, serviceTypes } from '@app/core/types/service-types';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ServiceEditor } from '../service-editor';
import ServiceEditorContext from '../service-editor-context.interface';
import { ServiceEditorDepsService } from '../service-editor-deps.service';

@Component({
  selector: 'app-service-type-edit',
  templateUrl: './service-type-edit.component.html',
  styleUrls: ['./service-type-edit.component.scss'],
})
export class ServiceTypeEditComponent extends ServiceEditor {
  public readonly serviceTypes = serviceTypes;

  public type$: Observable<ServiceType>;

  constructor(route: ActivatedRoute, deps: ServiceEditorDepsService) {
    super(route, deps);
    this.type$ = this.context$.pipe(
      switchMap(context => context.form.controls.service_type.valueChanges),
    );
  }

  public submit({ form, service }: ServiceEditorContext): void {
    const { service_type } = form.value;

    const newService: Service = {
      ...service,
      service_type,
    };
    this.saveAndReturn(newService);
  }

  protected createForm(service: Service): FormGroup {
    return new FormGroup({
      service_type: new FormControl(service.service_type, Validators.required),
    });
  }
}
