import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfessionalList, ServiceList } from '@app/api/models';
import { MasterManagerService } from '@app/core/services';
import { LoadingService } from '@app/core/services/loading.service';
import { ServicePublishSteps } from '@app/service/enums/service-publish-steps';
import { ServicePublishDataHolderService } from '@app/service/services/service-publish-data-holder.service';
import { ServicePublishDataPreparerService } from '@app/service/services/service-publish-data-preparer.service';
import { ServicePublishService } from '@app/service/services/service-publish.service';
import { ServiceStepsNavigationService } from '@app/service/services/service-steps-navigation.service';
import { Observable } from 'rxjs';
import { finalize, map, single } from 'rxjs/operators';

@Component({
  selector: 'app-service-publish-final-step',
  templateUrl: './service-publish-final-step.component.html',
  styleUrls: ['./service-publish-final-step.component.scss'],
})
export class ServicePublishFinalStepComponent {

  public service: ServiceList;

  constructor(
    private readonly servicePublish: ServicePublishService,
    private readonly servicePublishDataHolder: ServicePublishDataHolderService,
    public readonly serviceStepsNavigationService: ServiceStepsNavigationService,
    private readonly router: Router,
    private readonly masterManager: MasterManagerService,
    private readonly loading: LoadingService,
    private readonly servicePublishDataFormatter: ServicePublishDataPreparerService,
  ) {
  }

  public ionViewDidEnter(): void {
    this.service = null;
    this.servicePublishDataFormatter.getData().then(data => {
      this.service = {
        ...data.service,
        price: data.servicePrice,
        professional: 1,
      };
    });
  }

  public async publish(): Promise<void> {
    this.loading.presentLoading();
    const master = await this.getMaster().toPromise();
    if (master) {
      await this.servicePublishDataHolder.assignStepData(
        ServicePublishSteps.Final, { master },
      );
    }
    this.servicePublish.publish()
      .pipe(
        single(),
        finalize(() => this.loading.loadingDismiss()),
      )
      .subscribe(
        (service) => this.router.navigate(['service', service.id, 'edit'], { queryParams: { from: 'publish' } }),
      );
  }

  private getMaster(): Observable<ProfessionalList> {
    return this.masterManager.getMasterList().pipe(
      map(list => list[0]),
    );
  }
}
