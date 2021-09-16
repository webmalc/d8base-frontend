import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Service, ServiceLocation, ServiceSchedule } from '@app/api/models';
import { isFormInvalid } from '@app/core/functions/form.functions';
import { ServiceType, serviceTypes } from '@app/core/types/service-types';
import { ColumnHeaderComponent } from '@app/shared/components';
import { concat, forkJoin, Observable, of } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
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
  public schedule$: Observable<ServiceSchedule[]>;
  public showScheduleEditor: boolean;

  @ViewChild(ColumnHeaderComponent)
  protected header: ColumnHeaderComponent;

  constructor(route: ActivatedRoute, deps: ServiceEditorDepsService) {
    super(route, deps);
    this.type$ = this.context$.pipe(switchMap(context => context.form.controls.service_type.valueChanges));
    this.schedule$ = this.context$.pipe(
      switchMap(context =>
        deps.api.accountsServiceScheduleList({
          service: context.service.id,
        }),
      ),
      map(response => response.results),
      shareReplay(1),
    );
  }

  public submit({ form, service }: ServiceEditorContext): void {
    if (isFormInvalid(form)) {
      return;
    }
    const { service_type, location } = form.value;
    const disableOldLocation$ = this.disableServiceLocations(service.id);
    const enableNewLocation$ =
      service_type === 'online' ? of<ServiceLocation>(void 0) : this.createLocation(service.id, location);
    const { is_base_schedule, schedule } = form.value;
    const newSchedule: ServiceSchedule[] = schedule?.map(s => ({ ...s, service: service.id }));
    const createNewSchedule$ = is_base_schedule
      ? of<any>(void 0)
      : this.deps.api.accountsServiceScheduleSet(newSchedule);
    const newService: Service = {
      ...service,
      service_type,
      is_base_schedule,
    };
    const sources = [
      concat(disableOldLocation$, enableNewLocation$),
      concat(
        // must save the "is_base_schedule" flag before saving the schedules
        this.deps.api.accountsServicesUpdate({ id: service.id, data: newService }),
        createNewSchedule$,
      ),
    ];
    this.saveAndReturn(sources);
  }

  protected createForm(service: Service): FormGroup {
    this.showScheduleEditor = service.is_base_schedule;
    return new FormGroup({
      service_type: new FormControl(service.service_type, Validators.required),
      location: new FormControl(),
      is_base_schedule: new FormControl(service.is_base_schedule),
      schedule: new FormControl(),
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
    const update$: (l: ServiceLocation) => Observable<ServiceLocation> = l =>
      this.deps.api.accountsServiceLocationsUpdate({ id: l.id, data: l });
    return this.deps.api.accountsServiceLocationsList({ service: serviceId }).pipe(
      switchMap(locations => {
        const oldLocation = locations.results.find(l => l.location === location.location);
        return oldLocation ? update$({ ...oldLocation, is_enabled: true }) : create$;
      }),
    );
  }
}
