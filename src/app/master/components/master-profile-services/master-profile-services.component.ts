import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MasterProfileServicesSearchService} from '@app/master/services/master-profile-services-search.service';
import {ServicesGeneratorFactoryService} from '@app/master/services/services-generator-factory.service';
import {Service} from '@app/service/models/service';
import {ServiceTag} from '@app/service/models/service-tag';
import {ServicesApiService} from '@app/service/services/services-api.service';

@Component({
    selector: 'app-master-profile-services',
    templateUrl: './master-profile-services.component.html',
    styleUrls: ['./master-profile-services.component.scss']
})
export class MasterProfileServicesComponent {

    public searchModel: string;
    public serviceData: { service: Service, tags?: ServiceTag[] }[] = [];
    public masterId: number;
    private serviceDefaultData: { service: Service, tags?: ServiceTag[] }[] = [];

    constructor(
        private readonly route: ActivatedRoute,
        private readonly servicesApi: ServicesApiService,
        private readonly searchService: MasterProfileServicesSearchService,
        private readonly serviceGeneratorFactory: ServicesGeneratorFactoryService
    ) {
    }

    public init(): void {
        this.masterId = parseInt(this.route.snapshot.paramMap.get('master-id'), 10);
        this.serviceGeneratorFactory.getServiceList(this.masterId).subscribe(
            servicesData => this.serviceData = this.serviceDefaultData = servicesData
        );
    }

    public enableService(service: Service): void {
        this.patchService(service, true);
    }

    public disableService(service: Service): void {
        this.patchService(service, false);
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

    public patchService(service: Service, isEnabled: boolean): void {
        service.is_enabled = isEnabled;
        this.servicesApi.patch(service).subscribe(() => this.init());
    }
}
