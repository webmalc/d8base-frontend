import {Component, OnInit} from '@angular/core';
import {StepThreeDataInterface} from '@app/service/interfaces/step-three-data-interface';
import {ServicePublishDataHolderService} from '@app/service/services/service-publish-data-holder.service';
import {ServiceStepsNavigationService} from '@app/service/services/service-steps-navigation.service';

@Component({
    selector: 'app-service-publish-step-three',
    templateUrl: './service-publish-step-three.component.html',
    styleUrls: ['./service-publish-step-three.component.scss'],
})
export class ServicePublishStepThreeComponent implements OnInit {

    public static readonly STEP = 2;
    public files: File[] = [];

    constructor(
        private servicePublishDataHolderService: ServicePublishDataHolderService,
        public serviceStepsNavigationService: ServiceStepsNavigationService
    ) {
    }

    public ngOnInit(): void {
        if (this.servicePublishDataHolderService.isset(ServicePublishStepThreeComponent.STEP)) {
            this.files =
                this.servicePublishDataHolderService.getStepData<StepThreeDataInterface>(ServicePublishStepThreeComponent.STEP).photos;
        }
    }

    public submit(): void {
        this.servicePublishDataHolderService.setStepData<StepThreeDataInterface>(
            ServicePublishStepThreeComponent.STEP, {photos: this.files}
            );
        this.serviceStepsNavigationService.navigateToNextStep();
    }

    public onSelect(data: { addedFiles: File[] }): void {
        this.files.push(...data.addedFiles);
    }

    public onRemove(data: File): void {
        this.files.splice(this.files.indexOf(data), 1);
    }
}
