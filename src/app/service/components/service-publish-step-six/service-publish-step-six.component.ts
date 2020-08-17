import {Component, OnInit} from '@angular/core';
import {TranslationService} from '@app/core/services/translation.service';
import {ServicePublishStepSixFormFields} from '@app/service/enums/service-publish-step-six-form-fields';
import {ServicePublishStepSixFormService} from '@app/service/forms/service-publish-step-six-form.service';
import {StepSixDataInterface} from '@app/service/interfaces/step-six-data-interface';
import {ServicePublishDataHolderService} from '@app/service/services/service-publish-data-holder.service';
import {ServiceStepsNavigationService} from '@app/service/services/service-steps-navigation.service';

@Component({
    selector: 'app-service-publish-step-six',
    templateUrl: './service-publish-step-six.component.html',
    styleUrls: ['./service-publish-step-six.component.scss'],
})
export class ServicePublishStepSixComponent implements OnInit {

    public formFields = ServicePublishStepSixFormFields;
    public levelList = ['junior', 'middle', 'senior'];
    private readonly STEP = 5;

    constructor(
        public formService: ServicePublishStepSixFormService,
        private servicePublishDataHolder: ServicePublishDataHolderService,
        public serviceStepsNavigationService: ServiceStepsNavigationService,
        public trans: TranslationService
    ) { }

    public ngOnInit(): void {
        if (this.servicePublishDataHolder.isset(this.STEP)) {
            this.formService.createForm(this.servicePublishDataHolder.getStepData<StepSixDataInterface>(this.STEP));
        } else {
            this.formService.createForm();
        }
    }

    public submitForm(): void {
        this.servicePublishDataHolder.setStepData(this.STEP, this.formService.form.getRawValue());
        this.serviceStepsNavigationService.navigateToNextStep();
    }
}
