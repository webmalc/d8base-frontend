import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountsService, ServicesService } from '@app/api/services';
import { AbstractSchedule } from '@app/core/models/abstract-schedule';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, first, map, mergeMap, shareReplay, switchMap } from 'rxjs/operators';
import { ServiceOperationsService } from '@app/core/services/service-operations.service';
import { Service, ServicePhoto } from '@app/api/models';
import { ServicesApiCache } from '@app/core/services/cache';
import { HelperService } from '@app/core/services/helper.service';
import { fileToBase64 } from '@app/core/functions/file.functions';

@Component({
  selector: 'app-service-editor-page',
  templateUrl: './service-editor-page.component.html',
  styleUrls: ['./service-editor-page.component.scss'],
  providers: [ServicesApiCache],
})
export class ServiceEditorPageComponent {
  public service$: Observable<Service>;
  public schedule$: Observable<AbstractSchedule[]>;
  public photos$: Observable<ServicePhoto[]>;
  public showSuccessOrderNotification$: Observable<boolean>;

  private readonly refresh$ = new BehaviorSubject<void>(null);

  constructor(
    private readonly serviceOperations: ServiceOperationsService,
    route: ActivatedRoute,
    private readonly api: AccountsService,
    apiReadonly: ServicesService,
  ) {
    this.service$ = combineLatest([route.params, this.refresh$]).pipe(
      filter(([params]) => !!params.id),
      switchMap(([params]) => apiReadonly.servicesServicesRead(params.id)),
      shareReplay(1),
    );
    this.schedule$ = this.service$.pipe(
      switchMap(service =>
        service.is_base_schedule
          ? api.accountsProfessionalScheduleList({}).pipe(map(response => response.results))
          : api.accountsServiceScheduleList({ service: service.id }).pipe(map(response => response.results)),
      ),
    );
    this.photos$ = this.service$.pipe(
      switchMap(service => api.accountsServicePhotosList({ service: service.id })),
      map(response => response.results),
      shareReplay(1),
    );
    this.showSuccessOrderNotification$ = route.queryParams.pipe(
      first(),
      map(params => params.from === 'publish'),
    );
  }

  public setIsEnabled(service: Service, isEnabled: boolean): void {
    const operation = isEnabled
      ? this.serviceOperations.enableService(service)
      : this.serviceOperations.disableService(service);
    operation.subscribe(() => this.refresh$.next());
  }

  public setAutoConfirmation(service: Service, autoConfirm: boolean): void {
    this.serviceOperations.setAutoConfirm(service, autoConfirm).subscribe(() => this.refresh$.next());
  }

  public deleteService(service: Service): void {
    this.serviceOperations.deleteService(service.id).subscribe(() => this.refresh$.next());
  }
}
