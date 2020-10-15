import {Component, OnInit} from '@angular/core';
import {TranslationService} from '@app/core/services/translation.service';
import {ServicePublishStepSixFormFields} from '@app/service/enums/service-publish-step-six-form-fields';
import {ServicePublishSteps} from '@app/service/enums/service-publish-steps';
import {ServicePublishStepSixFormService} from '@app/service/forms/service-publish-step-six-form.service';
import {StepSixDataInterface} from '@app/service/interfaces/step-six-data-interface';
import {ServicePublishAuthStateManagerService} from '@app/service/services/service-publish-auth-state-manager.service';
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

    constructor(
        public formService: ServicePublishStepSixFormService,
        private servicePublishDataHolder: ServicePublishDataHolderService,
        public serviceStepsNavigationService: ServiceStepsNavigationService,
        public trans: TranslationService,
        private authStateManager: ServicePublishAuthStateManagerService
    ) { }

    public ngOnInit(): void {
        this.authStateManager.updateFourStepState();
        if (this.servicePublishDataHolder.isset(ServicePublishSteps.Six)) {
            this.formService.createForm(
                this.servicePublishDataHolder.getStepData<StepSixDataInterface>(ServicePublishSteps.Six)
            );
        } else {
            this.formService.createForm();
        }
    }

    public submitForm(): void {
        this.servicePublishDataHolder.setStepData<StepSixDataInterface>(
            ServicePublishSteps.Six, this.formService.form.getRawValue()
        );
        this.serviceStepsNavigationService.next();
    }
}
