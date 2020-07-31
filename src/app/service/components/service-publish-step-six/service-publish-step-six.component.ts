import {Component, OnInit} from '@angular/core';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {TranslationService} from '@app/core/services/translation.service';
import {ServicePublishStepSixFormFields} from '@app/service/enums/service-publish-step-six-form-fields';
import {ServicePublishStepSixFormService} from '@app/service/forms/service-publish-step-six-form.service';
import {StepSixDataInterface} from '@app/service/interfaces/step-six-data-interface';
import {ServicePublishService} from '@app/service/services/service-publish.service';
import {ServiceStepsNavigationService} from '@app/service/services/service-steps-navigation.service';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-service-publish-step-six',
    templateUrl: './service-publish-step-six.component.html',
    styleUrls: ['./service-publish-step-six.component.scss'],
})
export class ServicePublishStepSixComponent implements OnInit {

    public formFields = ServicePublishStepSixFormFields;
    public levelList$: BehaviorSubject<{ value: string, display_name: string }[]> =
        new BehaviorSubject<{value: string, display_name: string}[]>([]);
    private readonly STEP = 5;

    constructor(
        public formService: ServicePublishStepSixFormService,
        private servicePublishService: ServicePublishService,
        public serviceStepsNavigationService: ServiceStepsNavigationService,
        public trans: TranslationService,
        private masterManager: MasterManagerService
    ) { }

    public ngOnInit(): void {
        this.masterManager.getExperienceLevelList().subscribe(data => this.levelList$.next(data));
        if (this.servicePublishService.isset(this.STEP)) {
            this.formService.createForm(this.servicePublishService.getStepData<StepSixDataInterface>(this.STEP));
        } else {
            this.formService.createForm();
        }
    }

    public submitForm(): void {
        this.servicePublishService.setStepData(this.STEP, this.formService.form.getRawValue());
        this.serviceStepsNavigationService.navigateToNextStep();
    }
}
