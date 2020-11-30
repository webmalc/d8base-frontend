import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ServicesReadonlyApiService} from '@app/core/services/services-readonly-api.service';
import {MasterList} from '@app/master/models/master-list';
import {MasterReadonlyApiService} from '@app/master/services/master-readonly-api.service';
import {Service} from '@app/service/models/service';
import {first, switchMap, tap} from 'rxjs/operators';

@Component({
    selector: 'app-service-details-page',
    templateUrl: './service-details-page.component.html',
    styleUrls: ['./service-details-page.component.scss']
})
export class ServiceDetailsPageComponent {

    public service: Service;

    public master: MasterList;

    constructor(
        route: ActivatedRoute,
        servicesApi: ServicesReadonlyApiService,
        masterApi: MasterReadonlyApiService
    ) {
        route.params.pipe(
            first(params => Boolean(params?.id)),
            switchMap(params => servicesApi.getByEntityId(params.id)),
            tap(service => this.service = service),
            switchMap(service => masterApi.getByEntityId(service.professional))
        ).subscribe(master => this.master = master);
    }
}
