import { Injectable } from '@angular/core';
import { Service } from '@app/api/models';
import { AccountsService } from '@app/api/services';
import ServiceData from '@app/core/interfaces/service-data.interface';
import { ServiceTagsReadonlyApiService } from '@app/core/services/service-tags-readonly-api.service';
import { forkJoin, Observable, of } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';

@Injectable()
export class ServicesGeneratorFactoryService {

  constructor(
    private readonly api: AccountsService,
    private readonly serviceTagsReadonlyApi: ServiceTagsReadonlyApiService,
  ) {
  }

  public getServiceList(masterId?: number): Observable<ServiceData[]> {
    return this.api.accountsServicesList(
      {
        professional: masterId,
        ordering: 'created',
        isEnabled: 'true',
      },
    ).pipe(
      switchMap(serviceList => this.combineWithTags(serviceList.results)),
    );
  }

  private combineWithTags(serviceList: Service[]): Observable<ServiceData[]> {
    return of(serviceList).pipe(
      mergeMap(services => forkJoin(
        [...services.map(service => this.serviceTagsReadonlyApi.get({ service: service.id.toString() }).pipe(
          map(res => ({ service, tags: res.results })),
        ))],
      )),
    );
  }
}
