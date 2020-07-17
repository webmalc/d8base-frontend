import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ServicePublishStepFourFormFields} from '@app/service/enums/service-publish-step-four-form-fields';
import {ServicePublishStepFourFormService} from '@app/service/forms/service-publish-step-four-form.service';
import {StepFourDataInterface} from '@app/service/interfaces/step-four-data-interface';
import {ServicePublishService} from '@app/service/services/service-publish.service';
import {Reinitable} from '@app/shared/abstract/reinitable';

@Component({
    selector: 'app-service-publish-step-four',
    templateUrl: './service-publish-step-four.component.html',
    styleUrls: ['./service-publish-step-four.component.scss'],
})
export class ServicePublishStepFourComponent extends Reinitable implements OnInit {

    public readonly formFields = ServicePublishStepFourFormFields;
    private readonly STEP = 3;

    constructor(
        public formService: ServicePublishStepFourFormService,
        private servicePublishService: ServicePublishService,
        private router: Router
    ) {
        super();
    }

    public ngOnInit(): void {
        if (this.servicePublishService.isset(this.STEP)) {
            this.formService.createForm(this.servicePublishService.getStepData<StepFourDataInterface>(this.STEP));
        } else {
            this.formService.createForm();
        }
    }

    public submitForm(): void {
        this.servicePublishService.setStepData(this.STEP, this.formService.form.getRawValue());
        this.router.navigateByUrl('/service/publish/step-five');
    }
}
