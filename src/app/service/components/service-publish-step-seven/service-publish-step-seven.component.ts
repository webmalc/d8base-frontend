import { Component, OnInit } from '@angular/core';
import {TranslationService} from '@app/core/services/translation.service';
import {Country} from '@app/profile/models/country';
import {ServicePublishStepSevenFormFields} from '@app/service/enums/service-publish-step-seven-form-fields';
import {ServicePublishStepSevenFormService} from '@app/service/forms/service-publish-step-seven-form.service';
import {StepSevenDataInterface} from '@app/service/interfaces/step-seven-data-interface';
import {StepSevenDepartureDataInterface} from '@app/service/interfaces/step-seven-departure-data-interface';
import {ServicePublishService} from '@app/service/services/service-publish.service';
import {SelectableCityOnSearchService} from '@app/shared/services/selectable-city-on-search.service';
import {SelectableCountryOnSearchService} from '@app/shared/services/selectable-country-on-search.service';

@Component({
    selector: 'app-service-publish-step-seven',
    templateUrl: './service-publish-step-seven.component.html',
    styleUrls: ['./service-publish-step-seven.component.scss'],
})
export class ServicePublishStepSevenComponent implements OnInit {

    public formFields = ServicePublishStepSevenFormFields;
    public readonly STEP = 6;

    constructor(
        public formService: ServicePublishStepSevenFormService,
        public trans: TranslationService,
        public servicePublish: ServicePublishService,
        public readonly countrySelectable: SelectableCountryOnSearchService,
        public readonly citySelectable: SelectableCityOnSearchService
    ) { }

    public ngOnInit(): void {
        if (this.servicePublish.isset(this.STEP)) {
            this.formService.createForm(this.servicePublish.getStepData<StepSevenDataInterface>(this.STEP));
        } else {
            this.formService.createForm();
            this.formService.setCityDisabled(true);
        }
    }

    public submitForm(): void {
        this.servicePublish.assignStepData(this.STEP, this.formService.form.getRawValue());
    }

    public onCountryChange(): void {
        this.formService.setCityDisabled(false);
    }

    public getCountryValue(): Country {
        return this.formService.getFormFieldValue(this.formFields.Country);
    }

    public getDepartureData(): StepSevenDepartureDataInterface {
        return this.servicePublish.getStepData<StepSevenDataInterface>(this.STEP)?.departure;
    }
}
