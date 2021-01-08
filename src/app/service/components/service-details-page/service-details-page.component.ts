import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfessionalList } from '@app/api/models';
import { ServicesReadonlyApiService } from '@app/core/services/services-readonly-api.service';
import { MasterReadonlyApiService } from '@app/master/services/master-readonly-api.service';
import { Service } from '@app/service/models/service';
import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-service-details-page',
    templateUrl: './service-details-page.component.html',
    styleUrls: ['./service-details-page.component.scss']
})
export class ServiceDetailsPageComponent {

    public service: Service;
    public master: ProfessionalList;
    public showSuccessOrderNotification$: Observable<boolean>;

    constructor(
        public location: Location,
        route: ActivatedRoute,
        servicesApi: ServicesReadonlyApiService,
        masterApi: MasterReadonlyApiService
    ) {
        route.params.pipe(
            first(params => Boolean(params?.id)),
            switchMap(params => servicesApi.getByEntityId(params.id).pipe(
                switchMap(service => masterApi.getByEntityId(service.professional).pipe(
                map((master) => {
                    return {
                        master,
                        service
                    };
                })))
            ))
        ).subscribe(({ master, service }) => {
            this.master = master;
            this.service = service;
        });
        this.showSuccessOrderNotification$ = route.queryParams.pipe(
            first(),
            map(params => params.from === 'publish')
        );
    }
}
