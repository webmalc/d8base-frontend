import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfessionalList, ServiceList } from '@app/api/models';
import { ProfessionalsService, ServicesService } from '@app/api/services';
import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-service-viewer-page',
  templateUrl: './service-viewer-page.component.html',
  styleUrls: ['./service-viewer-page.component.scss'],
})
export class ServiceViewerPageComponent {

  public service: ServiceList;
  public master: ProfessionalList;
  public showSuccessOrderNotification$: Observable<boolean>;

  constructor(
    public location: Location,
    route: ActivatedRoute,
    servicesApi: ServicesService,
    masterApi: ProfessionalsService,
  ) {
    route.params.pipe(
      first(params => Boolean(params?.id)),
      switchMap(params => servicesApi.servicesServicesRead(params.id).pipe(
        switchMap(service => masterApi.professionalsProfessionalsRead(service.professional).pipe(
          map((master) => ({
              master,
              service,
            })))),
      )),
    ).subscribe(({ master, service }) => {
      this.master = master;
      this.service = service;
    });
    this.showSuccessOrderNotification$ = route.queryParams.pipe(
      first(),
      map(params => params.from === 'publish'),
    );
  }
}
