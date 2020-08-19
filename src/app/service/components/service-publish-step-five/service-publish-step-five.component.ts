import {Component, OnInit} from '@angular/core';
import {ServicePublishStepFourComponent} from '@app/service/components/service-publish-step-four/service-publish-step-four.component';
import {ServicePublishStepFiveFormFields} from '@app/service/enums/service-publish-step-five-form-fields';
import {ServicePublishStepFiveFormService} from '@app/service/forms/service-publish-step-five-form.service';
import {StepFiveDataInterface} from '@app/service/interfaces/step-five-data-interface';
import {StepFourDataInterface} from '@app/service/interfaces/step-four-data-interface';
import {ServicePublishDataHolderService} from '@app/service/services/service-publish-data-holder.service';
import {ServiceStepsNavigationService} from '@app/service/services/service-steps-navigation.service';

@Component({
    selector: 'app-service-publish-step-five',
    templateUrl: './service-publish-step-five.component.html',
    styleUrls: ['./service-publish-step-five.component.scss'],
})
export class ServicePublishStepFiveComponent implements OnInit {

    public static readonly STEP = 4;
    public readonly formFields = ServicePublishStepFiveFormFields;

    constructor(
        public formService: ServicePublishStepFiveFormService,
        private servicePublishDataHolder: ServicePublishDataHolderService,
        public serviceStepsNavigationService: ServiceStepsNavigationService
    ) { }

    public ngOnInit(): void {
        if (!this.servicePublishDataHolder.getStepData<StepFourDataInterface>(ServicePublishStepFourComponent.STEP).isNewMaster) {
            return this.serviceStepsNavigationService.navigateToNextStep();
        }
        if (this.servicePublishDataHolder.isset(ServicePublishStepFiveComponent.STEP)) {
            this.formService.createForm(
                this.servicePublishDataHolder.getStepData<StepFiveDataInterface>(ServicePublishStepFiveComponent.STEP)
            );
        } else {
            this.formService.createForm();
        }
    }

    public submitForm(): void {
        this.servicePublishDataHolder.setStepData<StepFiveDataInterface>(
            ServicePublishStepFiveComponent.STEP, this.formService.form.getRawValue()
        );
        this.serviceStepsNavigationService.navigateToNextStep();
    }

    public onSelect(data: {addedFiles: File[]}): void {
        this.formService.addPhoto(data.addedFiles.pop());
    }

    public onRemove(): void {
        this.formService.deletePhoto();
    }
}
