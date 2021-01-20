import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '@app/api/services';
import { ServiceScheduleApiService } from '@app/core/services/service-schedule-api.service';
import { ServiceList } from '@app/api/models';
import { ServiceSchedule } from '@app/service/models/service-schedule';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-service-editor-page',
  templateUrl: './service-editor-page.component.html',
  styleUrls: ['./service-editor-page.component.scss'],
})
export class ServiceEditorPageComponent {
  public service$: Observable<ServiceList>;
  public schedule$: Observable<ServiceSchedule>;

  constructor(
    route: ActivatedRoute,
    servicesApi: ServicesService,
    serviceScheduleApi: ServiceScheduleApiService,
  ) {
    this.service$ = route.params.pipe(
      filter(params => !!params.id),
      switchMap(params => servicesApi.servicesServicesRead(params.id)),
    );
  }

  public setIsEnabled(isEnabled: boolean): void {
    //
  }

  public setAutoConfirmation(autoConfirm: boolean): void {
    //
  }
}
