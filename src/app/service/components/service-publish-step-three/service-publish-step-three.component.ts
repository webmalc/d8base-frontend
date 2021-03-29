import { Component, OnInit } from '@angular/core';
import { ServicePublishSteps } from '@app/service/enums/service-publish-steps';
import { StepThreeDataInterface } from '@app/service/interfaces/step-three-data-interface';
import { ServicePublishDataHolderService } from '@app/service/services/service-publish-data-holder.service';
import { ServiceStepsNavigationService } from '@app/service/services/service-steps-navigation.service';

@Component({
  selector: 'app-service-publish-step-three',
  templateUrl: './service-publish-step-three.component.html',
  styleUrls: ['./service-publish-step-three.component.scss'],
})
export class ServicePublishStepThreeComponent implements OnInit {

  public files: File[] = [];

  constructor(
    private readonly servicePublishDataHolderService: ServicePublishDataHolderService,
    public serviceStepsNavigationService: ServiceStepsNavigationService,
  ) {
  }

  public ngOnInit(): void {
    if (this.servicePublishDataHolderService.isset(ServicePublishSteps.Three)) {
      this.files =
        this.servicePublishDataHolderService.getStepData<StepThreeDataInterface>(ServicePublishSteps.Three).photos;
    }
  }

  public submit(): void {
    this.servicePublishDataHolderService.setStepData<StepThreeDataInterface>(
      ServicePublishSteps.Three, { photos: this.files },
    );
    this.serviceStepsNavigationService.next();
  }

  public onSelect(files: File[]): void {
    this.files = this.files.concat(files);
  }

  public onRemove(data: File): void {
    this.files.splice(this.files.indexOf(data), 1);
  }
}
