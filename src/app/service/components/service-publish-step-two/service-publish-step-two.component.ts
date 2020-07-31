import {Component, OnInit} from '@angular/core';
import {ServicePublishStepTwoFormFields} from '@app/service/enums/service-publish-step-two-form-fields';
import {ServicePublishStepTwoFormService} from '@app/service/forms/service-publish-step-two-form.service';
import {StepTwoDataInterface} from '@app/service/interfaces/step-two-data-interface';
import {ServicePublishService} from '@app/service/services/service-publish.service';
import {ServiceStepsNavigationService} from '@app/service/services/service-steps-navigation.service';
import {ServicesApiService} from '@app/service/services/services-api.service';
import {Reinitable} from '@app/shared/abstract/reinitable';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-service-publish-step-two',
    templateUrl: './service-publish-step-two.component.html',
    styleUrls: ['./service-publish-step-two.component.scss'],
})
export class ServicePublishStepTwoComponent extends Reinitable implements OnInit {

    public durationHours: number;
    public durationMinutes: number;
    public serviceTypeList: BehaviorSubject<{value: string, display_name: string}[]> =
        new BehaviorSubject<{value: string, display_name: string}[]>([]);
    public readonly formFields = ServicePublishStepTwoFormFields;
    private readonly STEP = 1;

    constructor(
        private servicePublishService: ServicePublishService,
        public formService: ServicePublishStepTwoFormService,
        private servicesApiService: ServicesApiService,
        public serviceStepsNavigationService: ServiceStepsNavigationService
    ) {
        super();
    }

    public ngOnInit(): void {
        if (this.servicePublishService.isset(this.STEP)) {
            this.formService.createForm(this.servicePublishService.getStepData<StepTwoDataInterface>(this.STEP));
        } else {
            this.formService.createForm();
        }
        this.servicesApiService.getServiceTypeList().subscribe(
            data => this.serviceTypeList.next(data)
        );
    }

    public submitForm(): void {
        this.servicePublishService.setStepData(this.STEP, this.formService.form.getRawValue());
        this.serviceStepsNavigationService.navigateToNextStep();
    }

    public durationHoursChange(): void {
        this.durationHours = parseInt(this.formService.form.get(this.formFields.DurationHours).value, 10);
    }

    public durationMinutesChange(): void {
        this.durationMinutes = parseInt(this.formService.form.get(this.formFields.DurationMinutes).value, 10);
    }
}
