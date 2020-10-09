import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MasterProfileServicesSearchService} from '@app/master/services/master-profile-services-search.service';
import {Service} from '@app/service/models/service';
import {ServiceTag} from '@app/service/models/service-tag';
import {ServiceTagsApiService} from '@app/service/services/service-tags-api.service';
import {ServicesApiService} from '@app/service/services/services-api.service';
import {forkJoin, Observable, of} from 'rxjs';
import {mergeMap, switchMap, tap} from 'rxjs/operators';

@Component({
    selector: 'app-master-profile-services',
    templateUrl: './master-profile-services.component.html',
    styleUrls: ['./master-profile-services.component.scss'],
})
export class MasterProfileServicesComponent {

    public serviceData: { service: Service, tags: ServiceTag[] }[] = [];
    public searchModel: string;
    private masterId: number;
    private serviceDefaultData: { service: Service, tags: ServiceTag[] }[] = [];

    constructor(
        private route: ActivatedRoute,
        private servicesApi: ServicesApiService,
        private serviceTagsApi: ServiceTagsApiService,
        private searchService: MasterProfileServicesSearchService
    ) {
    }

    public init(): void {
        this.masterId = parseInt(this.route.snapshot.paramMap.get('master-id'), 10);
        this.servicesApi.get({professional: this.masterId.toString()}).pipe(
            switchMap(serviceList => this.generateData(serviceList.results))
        ).subscribe(
            _ => this.serviceDefaultData = this.serviceData
        );
    }

    public search(): void {
        if (this.searchModel.length === 0) {
            this.serviceData = this.serviceDefaultData;
        }
        if (this.searchModel.length < 3) {
            return;
        }

        this.serviceData = this.searchService.search(this.serviceDefaultData, this.searchModel);
    }

    public clearSearchModel(): void {
        this.searchModel = '';
    }

    private generateData(serviceList: Service[]): Observable<ServiceTag[]> {
        return of(serviceList).pipe(
            mergeMap(services => forkJoin(
                ...services.map(service => this.serviceTagsApi.get({service: service.id.toString()}).pipe(
                    tap(res => this.serviceData.push({service, tags: res.results}))
                    )
                ))
            )
        );
    }
}
