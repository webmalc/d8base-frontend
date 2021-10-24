import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ServiceList } from '@app/api/models/service-list';
import { toNumber } from '@app/core/functions/string.functions';
import { ServicesService } from '@app/api/services/services.service';

@Injectable()
export class ServiceResolver implements Resolve<ServiceList> {
  constructor(private readonly services: ServicesService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<ServiceList> {
    const id = toNumber(route.paramMap.get('id'));
    return id ? this.services.servicesServicesRead(id) : of(null);
  }
}
