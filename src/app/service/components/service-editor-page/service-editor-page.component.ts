import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesApiService } from '@app/core/services/services-api.service';
import { ServiceSchedule } from '@app/service/models/service-schedule';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { ServiceOperationsService } from '@app/core/services/service-operations.service';
import { Service } from '@app/service/models/service';
import { ServicesApiCache } from '@app/core/services/cache';

@Component({
  selector: 'app-service-editor-page',
  templateUrl: './service-editor-page.component.html',
  styleUrls: ['./service-editor-page.component.scss'],
  providers: [ServicesApiCache],
})
export class ServiceEditorPageComponent {
  public service$: Observable<Service>;
  public schedule$: Observable<ServiceSchedule>; // no backend yet

  private readonly refresh$ = new BehaviorSubject<void>(null);

  constructor(
    private readonly serviceOperations: ServiceOperationsService,
    route: ActivatedRoute,
    servicesApi: ServicesApiService,
  ) {
    this.service$ = combineLatest([route.params, this.refresh$]).pipe(
      filter(([params]) => !!params.id),
      switchMap(([params]) => servicesApi.getByEntityId(params.id)),
    );
  }

  public setIsEnabled(service: Service, isEnabled: boolean): void {
    const operation = isEnabled ? this.serviceOperations.enableService(service) : this.serviceOperations.disableService(service);
    operation.subscribe(() => this.refresh$.next());
  }

  public setAutoConfirmation(service: Service, autoConfirm: boolean): void {
    //
  }

  public deleteService(service: Service): void {
    this.serviceOperations.deleteService(service).subscribe(() => this.refresh$.next());
  }
}
