import {Component, OnInit} from '@angular/core';
import {StepThreeDataInterface} from '@app/service/interfaces/step-three-data-interface';
import {ServicePublishService} from '@app/service/services/service-publish.service';
import {ServiceStepsNavigationService} from '@app/service/services/service-steps-navigation.service';

@Component({
    selector: 'app-service-publish-step-three',
    templateUrl: './service-publish-step-three.component.html',
    styleUrls: ['./service-publish-step-three.component.scss'],
})
export class ServicePublishStepThreeComponent implements OnInit {

    public files: File[] = [];
    private readonly STEP = 2;

    constructor(
        private servicePublishService: ServicePublishService,
        public serviceStepsNavigationService: ServiceStepsNavigationService
    ) { }

    public ngOnInit(): void {
        if (this.servicePublishService.isset(this.STEP)) {
            this.files = this.servicePublishService.getStepData<StepThreeDataInterface>(this.STEP).photos;
        }
    }

    public submit(): void {
        this.servicePublishService.setStepData(this.STEP, this.files);
        this.serviceStepsNavigationService.navigateToNextStep();
    }

    public onSelect(data: {addedFiles: File[]}): void {
        this.files.push(...data.addedFiles);
    }

    public onRemove(data: File): void {
        this.files.splice(this.files.indexOf(data), 1);
    }
}
