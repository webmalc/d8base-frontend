import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Service, ServiceLocation } from '@app/api/models';
import { ServiceType, serviceTypes } from '@app/core/types/service-types';
import { concat, forkJoin, Observable, of } from 'rxjs';
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
    const { service_type, location } = form.value;
    const deleteOldLocation$ = this.deps.api.accountsServiceLocationsList({ service: service.id.toString() }).pipe(
      switchMap(locations => locations.count > 0
        ? forkJoin(locations.results.map(l => this.deps.api.accountsServiceLocationsDelete(l.id)))
        : of<null>(void 0),
      ),
    );
    const createNewLocation$ = service_type === 'online'
      ? of<ServiceLocation>(void 0)
      : this.deps.api.accountsServiceLocationsCreate(location);
    const newService: Service = {
      ...service,
      service_type,
    };
    const sources = [
      concat(deleteOldLocation$, createNewLocation$),
      this.deps.api.accountsServicesUpdate({ id: service.id, data: newService }),
    ];
    this.saveAndReturn(sources);
  }

  protected createForm(service: Service): FormGroup {
    return new FormGroup({
      service_type: new FormControl(service.service_type, Validators.required),
      location: new FormControl(),
    });
  }
}
