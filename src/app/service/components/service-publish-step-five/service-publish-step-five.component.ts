import {Component, OnInit} from '@angular/core';
import {ServicePublishStepFiveFormFields} from '@app/service/enums/service-publish-step-five-form-fields';
import {ServicePublishSteps} from '@app/service/enums/service-publish-steps';
import {ServicePublishStepFiveFormService} from '@app/service/forms/service-publish-step-five-form.service';
import {StepFiveDataInterface} from '@app/service/interfaces/step-five-data-interface';
import {ServicePublishDataHolderService} from '@app/service/services/service-publish-data-holder.service';
import {ServiceStepsNavigationService} from '@app/service/services/service-steps-navigation.service';

@Component({
    selector: 'app-service-publish-step-five',
    templateUrl: './service-publish-step-five.component.html',
    styleUrls: ['./service-publish-step-five.component.scss']
})
export class ServicePublishStepFiveComponent implements OnInit {

    public readonly formFields = ServicePublishStepFiveFormFields;

    constructor(
        public formService: ServicePublishStepFiveFormService,
        private readonly servicePublishDataHolder: ServicePublishDataHolderService,
        public serviceStepsNavigationService: ServiceStepsNavigationService
    ) { }

    public ngOnInit(): void {
        if (this.servicePublishDataHolder.isset(ServicePublishSteps.Five)) {
            this.formService.createForm(
                this.servicePublishDataHolder.getStepData<StepFiveDataInterface>(ServicePublishSteps.Five)
            );
        } else {
            this.formService.createForm();
        }
    }

    public submitForm(): void {
        this.servicePublishDataHolder.setStepData<StepFiveDataInterface>(
            ServicePublishSteps.Five, this.formService.form.getRawValue()
        );
        this.serviceStepsNavigationService.next();
    }

    public onSelect(data: {addedFiles: File[]}): void {
        this.formService.addPhoto(data.addedFiles.pop());
    }

    public onRemove(): void {
        this.formService.deletePhoto();
    }
}
