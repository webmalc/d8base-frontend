import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ServiceData from '@app/core/interfaces/service-data.interface';
import { ServicesGeneratorFactoryService } from '@app/master/services/services-generator-factory.service';
import { Service } from '@app/service/models/service';
import { ServicesApiService } from '@app/service/services/services-api.service';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-master-profile-services',
    templateUrl: './master-profile-services.component.html',
    styleUrls: ['./master-profile-services.component.scss'],
})
export class MasterProfileServicesComponent {

    public searchModel: string;
    public serviceData$: Observable<ServiceData[]>;
    public masterId: number;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly servicesApi: ServicesApiService,
        private readonly serviceGeneratorFactory: ServicesGeneratorFactoryService,
        private readonly alertController: AlertController,
        private readonly translate: TranslateService,
    ) {
    }

    public init(): void {
        this.masterId = parseInt(this.route.snapshot.paramMap.get('master-id'), 10);
        this.serviceData$ = this.serviceGeneratorFactory.getServiceList(this.masterId);
    }

    public enableService(service: Service): void {
        this.patchService(service, true);
    }

    public disableService(service: Service): void {
        this.patchService(service, false);
    }

    public async deleteService(service: Service): Promise<void> {
        const alert = await this.alertController.create({
            message: this.translate.instant('delete-confirmation.delete-service'),
            buttons: [
                {
                    text: this.translate.instant('delete-confirmation.cancel'),
                    role: 'cancel',
                }, {
                    text: this.translate.instant('delete-confirmation.okay'),
                    handler: () => {
                        this.servicesApi.delete(service).subscribe(() => this.init());
                    },
                },
            ],
        });

        await alert.present();
    }

    public search(event: CustomEvent): void {
        this.searchModel = event.detail.value;
    }

    public clearSearchModel(): void {
        this.searchModel = '';
    }

    public patchService(service: Service, isEnabled: boolean): void {
        service.is_enabled = isEnabled;
        this.servicesApi.patch(service).subscribe(() => this.init());
    }
}
