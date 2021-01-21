import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesApiService } from '@app/core/services/services-api.service';
import { Service } from '@app/service/models/service';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-service-location-edit',
  templateUrl: './service-location-edit.component.html',
  styleUrls: ['./service-location-edit.component.scss'],
})
export class ServiceLocationEditComponent {
  public service$: Observable<Service>;

  constructor(
    route: ActivatedRoute,
    servicesApi: ServicesApiService,
  ) {
    this.service$ = route.params.pipe(
      filter(params => !!params.id),
      switchMap(params => servicesApi.getByEntityId(params.id)),
    );
  }
}
