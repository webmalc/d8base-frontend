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
    this.type$ = this.context$.pipe(switchMap(context => context.form.controls.service_type.valueChanges));
  }

  public submit({ form, service }: ServiceEditorContext): void {
    const { service_type, location } = form.value;
    const disableOldLocation$ = this.disableServiceLocations(service.id);
    const enableNewLocation$ =
      service_type === 'online' ? of<ServiceLocation>(void 0) : this.createLocation(service.id, location);
    const newService: Service = {
      ...service,
      service_type,
    };
    const sources = [
      concat(disableOldLocation$, enableNewLocation$),
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

  private disableServiceLocations(serviceId: number): Observable<ServiceLocation[]> {
    return this.deps.api.accountsServiceLocationsList({ service: serviceId }).pipe(
      switchMap(locations =>
        locations.count > 0
          ? forkJoin(
              locations.results.map(location =>
                this.deps.api.accountsServiceLocationsUpdate({
                  id: location.id,
                  data: {
                    ...location,
                    is_enabled: false,
                  },
                }),
              ),
            )
          : of<ServiceLocation[]>([]),
      ),
    );
  }

  /*
   * Creates a new location or enables it if already exists
   */
  private createLocation(
    serviceId: number,
    location: { location: number; max_distance: number; service: number },
  ): Observable<ServiceLocation> {
    const create$ = this.deps.api.accountsServiceLocationsCreate(location);
    const update$ = (l: ServiceLocation) => this.deps.api.accountsServiceLocationsUpdate({ id: l.id, data: l });
    return this.deps.api.accountsServiceLocationsList({ service: serviceId }).pipe(
      switchMap(locations => {
        const oldLocation = locations.results.find(l => l.location === location.location);
        return oldLocation ? update$({ ...oldLocation, is_enabled: true }) : create$;
      }),
    );
  }
}
