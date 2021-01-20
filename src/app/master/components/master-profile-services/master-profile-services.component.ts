import { Component } from '@angular/core';
import ServiceData from '@app/core/interfaces/service-data.interface';
import MasterProfileContext from '@app/master/interfaces/master-profile-context.interface';
import { MasterProfileContextService } from '@app/master/services/master-profile-context.service';
import { ServicesGeneratorFactoryService } from '@app/master/services/services-generator-factory.service';
import { Service } from '@app/service/models/service';
import { ServicesApiService } from '@app/core/services/services-api.service';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-master-profile-services',
  templateUrl: './master-profile-services.component.html',
  styleUrls: ['./master-profile-services.component.scss'],
})
export class MasterProfileServicesComponent {

  public searchModel: string;
  public serviceData$: Observable<ServiceData[]>;
  public context$: Observable<MasterProfileContext>;

  private readonly refresh$ = new BehaviorSubject<void>(null);

  constructor(
    private readonly servicesApi: ServicesApiService,
    private readonly serviceGeneratorFactory: ServicesGeneratorFactoryService,
    private readonly alertController: AlertController,
    private readonly translate: TranslateService,
    contextService: MasterProfileContextService,
  ) {
    this.context$ = contextService.context$;
    this.serviceData$ = combineLatest([this.context$, this.refresh$]).pipe(
      first(([context]) => !!context.master),
      switchMap(([context]) => this.serviceGeneratorFactory.getServiceList(context.master.id)),
    );
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
            this.servicesApi.delete(service).subscribe(() => this.refresh$.next());
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
    this.servicesApi.patch(service).subscribe(() => this.refresh$.next());
  }
}
