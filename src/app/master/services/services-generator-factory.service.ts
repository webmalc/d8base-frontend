import {Injectable} from '@angular/core';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {Service} from '@app/service/models/service';
import {ServiceTag} from '@app/service/models/service-tag';
import {ServiceTagsApiService} from '@app/service/services/service-tags-api.service';
import {ServicesApiService} from '@app/service/services/services-api.service';
import {forkJoin, Observable, of} from 'rxjs';
import {map, mergeMap, switchMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ServicesGeneratorFactoryService {

    constructor(
        private servicesApi: ServicesApiService,
        private serviceTagsApi: ServiceTagsApiService,
        private masterManager: MasterManagerService
    ) {
    }

    public getServiceList(masterId?: number): Observable<{ service: Service, tags?: ServiceTag[] }[]> {
        return masterId ?
            this.servicesApi.get({professional: masterId.toString(), ordering: 'created'}).pipe(
                switchMap(serviceList => this.combineWithTags(serviceList.results))) :
            this.masterManager.getMasterList().pipe(
                switchMap(list => this.servicesApi.get({professional: list[0].id.toString(), ordering: 'created'}).pipe(
                    map(masterServiceList => masterServiceList.results.map(service => ({service})).reverse())
                ))
            );
    }

    private combineWithTags(serviceList: Service[]): Observable<{ service: Service, tags: ServiceTag[] }[]> {
        return of(serviceList).pipe(
            mergeMap(services => forkJoin(
                ...services.map(service => this.serviceTagsApi.get({service: service.id.toString()}).pipe(
                    map(res => ({service, tags: res.results}))
                ))
            ))
        );
    }
}
