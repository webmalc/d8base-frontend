import { Injectable } from '@angular/core';
import { ServiceList } from '@app/api/models';
import { ServicesService } from '@app/api/services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ServicesGeneratorFactoryService {
  constructor(private readonly api: ServicesService) {}

  public getServiceList(masterId: number, showOnlyEnabled: boolean = false): Observable<ServiceList[]> {
    let params: ServicesService.ServicesServicesListParams = {
      professional: masterId,
      ordering: '-created', // sort descending
    };
    if (showOnlyEnabled) {
      params = {
        ...params,
        isEnabled: 'true',
      };
    }
    return this.api.servicesServicesList(params).pipe(map(response => response.results));
  }
}
