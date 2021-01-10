import { Injectable } from '@angular/core';
import ServiceData from '@app/core/interfaces/service-data.interface';
import { MasterManagerService } from '@app/core/services/master-manager.service';
import { ServicesReadonlyApiService } from '@app/core/services/services-readonly-api.service';
import { Service } from '@app/service/models/service';
import { ServiceTag } from '@app/service/models/service-tag';
import { ServiceTagsReadonlyApiService } from '@app/service/services/service-tags-readonly-api.service';
import { forkJoin, Observable, of } from 'rxjs';
import { concatAll, map, mergeMap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServicesGeneratorFactoryService {

  constructor(
    private readonly servicesApi: ServicesReadonlyApiService,
    private readonly serviceTagsReadonlyApi: ServiceTagsReadonlyApiService,
    private readonly masterManager: MasterManagerService,
  ) {
  }

  public getServiceList(masterId?: number): Observable<ServiceData[]> {
    return masterId ?
      this.servicesApi.get({ professional: masterId.toString(), ordering: 'created', is_enabled: 'true' }).pipe(
        switchMap(serviceList => this.combineWithTags(serviceList.results))) :
      this.masterManager.getMasterList().pipe(
        map(list => forkJoin(list.map(professional =>
          (this.servicesApi.get({ professional: professional.id.toString(), ordering: 'created' })),
        ))),
        concatAll(),
        map(responses => responses.reduce(
          (acc: ServiceData[], response) => acc.concat(response.results.map(service => ({ service }))), [],
        )),
      );
  }

  private combineWithTags(serviceList: Service[]): Observable<{ service: Service, tags: ServiceTag[] }[]> {
    return of(serviceList).pipe(
      mergeMap(services => forkJoin(
        [...services.map(service => this.serviceTagsReadonlyApi.get({ service: service.id.toString() }).pipe(
          map(res => ({ service, tags: res.results })),
        ))],
      )),
    );
  }
}
