import { Component, OnInit } from '@angular/core';
import {ServicePublishStepSixFormFields} from '@app/service/enums/service-publish-step-six-form-fields';
import {ServicePublishStepSixFormService} from '@app/service/forms/service-publish-step-six-form.service';
import {StepSixDataInterface} from '@app/service/interfaces/step-six-data-interface';
import {ServicePublishService} from '@app/service/services/service-publish.service';

@Component({
    selector: 'app-service-publish-step-six',
    templateUrl: './service-publish-step-six.component.html',
    styleUrls: ['./service-publish-step-six.component.scss'],
})
export class ServicePublishStepSixComponent implements OnInit {

    public formFields = ServicePublishStepSixFormFields;
    private readonly STEP = 5;

    constructor(private formService: ServicePublishStepSixFormService, private servicePublishService: ServicePublishService) { }

    public ngOnInit(): void {
        if (this.servicePublishService.isset(this.STEP)) {
            this.formService.createForm(this.servicePublishService.getStepData<StepSixDataInterface>(this.STEP));
        } else {
            this.formService.createForm();
        }
    }

    public submitForm(): void {
        console.log(this.formService.form.getRawValue());
    }
}
