import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceList } from '@app/api/models';
import { ServiceLocationInline } from '@app/api/models/service-location-inline';
import { IonViewDidEnter } from '@app/core/interfaces/ionic.interfaces';
import { MasterManagerService } from '@app/core/services';
import { LoadingService } from '@app/core/services/loading.service';
import { ServicePublishDataHolderService } from '@app/service/services/service-publish-data-holder.service';
import { ServicePublishDataPreparerService } from '@app/service/services/service-publish-data-preparer.service';
import { ServicePublishService } from '@app/service/services/service-publish.service';
import { ServiceStepsNavigationService } from '@app/service/services/service-steps-navigation.service';
import { finalize, single } from 'rxjs/operators';

@Component({
  selector: 'app-service-publish-final-step',
  templateUrl: './service-publish-final-step.component.html',
  styleUrls: ['./service-publish-final-step.component.scss'],
})
export class ServicePublishFinalStepComponent implements IonViewDidEnter {
  public service: ServiceList;

  constructor(
    private readonly servicePublish: ServicePublishService,
    private readonly servicePublishDataHolder: ServicePublishDataHolderService,
    public readonly serviceStepsNavigationService: ServiceStepsNavigationService,
    private readonly router: Router,
    private readonly masterManager: MasterManagerService,
    private readonly loading: LoadingService,
    private readonly servicePublishDataPreparer: ServicePublishDataPreparerService,
  ) {}

  public ionViewDidEnter(): void {
    this.service = null;
    this.servicePublishDataPreparer.getData().then(data => {
      const serviceLocation: ServiceLocationInline = {
        id: data.serviceLocation?.id,
        max_distance: data.serviceLocation?.max_distance,
        location: {
          country: data.masterLocation?.country as number,
          city: data.masterLocation?.city as number,
          address: data.masterLocation?.address,
        },
      };
      this.service = {
        ...data.service,
        price: data.servicePrice,
        locations: [serviceLocation],
        professional: 1,
      };
    });
  }

  public publish(): void {
    this.loading.presentLoading();
    this.servicePublish
      .publish()
      .pipe(
        single(),
        finalize(() => this.loading.loadingDismiss()),
      )
      .subscribe(service =>
        this.router.navigate(['service', service.id, 'edit'], { queryParams: { from: 'publish' } }),
      );
  }
}
