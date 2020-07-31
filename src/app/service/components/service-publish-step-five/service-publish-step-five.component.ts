import {Component, OnInit} from '@angular/core';
import {ServicePublishStepFiveFormFields} from '@app/service/enums/service-publish-step-five-form-fields';
import {ServicePublishStepFiveFormService} from '@app/service/forms/service-publish-step-five-form.service';
import {StepFiveDataInterface} from '@app/service/interfaces/step-five-data-interface';
import {ServicePublishService} from '@app/service/services/service-publish.service';
import {ServiceStepsNavigationService} from '@app/service/services/service-steps-navigation.service';

@Component({
    selector: 'app-service-publish-step-five',
    templateUrl: './service-publish-step-five.component.html',
    styleUrls: ['./service-publish-step-five.component.scss'],
})
export class ServicePublishStepFiveComponent implements OnInit {

    public readonly formFields = ServicePublishStepFiveFormFields;
    private readonly STEP = 4;

    constructor(
        public formService: ServicePublishStepFiveFormService,
        private servicePublish: ServicePublishService,
        public serviceStepsNavigationService: ServiceStepsNavigationService
    ) { }

    public ngOnInit(): void {
        if (this.servicePublish.isset(this.STEP)) {
            this.formService.createForm(this.servicePublish.getStepData<StepFiveDataInterface>(this.STEP));
        } else {
            this.formService.createForm();
        }
    }

    public submitForm(): void {
        this.servicePublish.setStepData(this.STEP, this.formService.form.getRawValue());
        this.serviceStepsNavigationService.navigateToNextStep();
    }

    public onSelect(data: {addedFiles: File[]}): void {
        this.formService.addPhoto(data.addedFiles.pop());
    }

    public onRemove(): void {
        this.formService.deletePhoto();
    }
}
