import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service, ServicePhoto, ServiceTag } from '@app/api/models';
import { AccountsService, ServicesService } from '@app/api/services';
import { getProfessionalServicesUrl, getServiceUrl } from '@app/core/functions/navigation.functions';
import { AbstractSchedule } from '@app/core/models/abstract-schedule';
import { ServicesApiCache } from '@app/core/services/cache';
import { TagsManagerService } from '@app/core/services/managers';
import { ServiceManagerService } from '@app/core/services/managers/service-manager.service';
import { ColumnHeaderComponent } from '@app/shared/components';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-service-editor-page',
  templateUrl: './service-editor-page.component.html',
  styleUrls: ['./service-editor-page.component.scss'],
  providers: [ServicesApiCache],
})
export class ServiceEditorPageComponent {
  @ViewChild(ColumnHeaderComponent)
  public readonly header: ColumnHeaderComponent;

  public service$: Observable<Service>;
  public schedule$: Observable<AbstractSchedule[]>;
  public photos$: Observable<ServicePhoto[]>;
  public tags$: Observable<ServiceTag[]>;

  private readonly refresh$ = new BehaviorSubject<void>(null);

  constructor(
    private readonly serviceManager: ServiceManagerService,
    private readonly tagsManager: TagsManagerService,
    private readonly api: AccountsService,
    route: ActivatedRoute,
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
    this.tags$ = this.tagsManager.tags$;
  }

  public getProfessionalServicesUrl(professionalId: number): string {
    return getProfessionalServicesUrl(professionalId);
  }

  public getServiceUrl(serviceId: number): string {
    return getServiceUrl(serviceId);
  }

  public setIsEnabled(service: Service, isEnabled: boolean): void {
    const operation = isEnabled
      ? this.serviceManager.enableService(service)
      : this.serviceManager.disableService(service);
    operation.subscribe(() => this.refresh$.next());
  }

  public setAutoConfirmation(service: Service, autoConfirm: boolean): void {
    this.serviceManager.setAutoConfirm(service, autoConfirm).subscribe(() => this.refresh$.next());
  }

  public deleteService(service: Service): void {
    this.serviceManager.deleteService(service.id).subscribe(() => this.navigateBack());
  }

  public getServiceTags(serviceId: number): Observable<ServiceTag[]> {
    return this.tagsManager.getServiceTags(serviceId);
  }

  private navigateBack(): void {
    this.header.navigateBack();
  }
}
