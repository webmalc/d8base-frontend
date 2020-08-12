import {Component, OnInit} from '@angular/core';
import {TranslationService} from '@app/core/services/translation.service';
import {Country} from '@app/profile/models/country';
import {ServicePublishStepSevenFormFields} from '@app/service/enums/service-publish-step-seven-form-fields';
import {ServicePublishStepSevenFormService} from '@app/service/forms/service-publish-step-seven-form.service';
import {StepSevenDataInterface} from '@app/service/interfaces/step-seven-data-interface';
import {StepSevenDepartureDataInterface} from '@app/service/interfaces/step-seven-departure-data-interface';
import {ServicePublishDataHolderService} from '@app/service/services/service-publish-data-holder.service';
import {ServiceStepsNavigationService} from '@app/service/services/service-steps-navigation.service';
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
        public servicePublishDataHolderService: ServicePublishDataHolderService,
        public readonly countrySelectable: SelectableCountryOnSearchService,
        public readonly citySelectable: SelectableCityOnSearchService,
        public serviceStepsNavigationService: ServiceStepsNavigationService
    ) { }

    public ngOnInit(): void {
        // console.log(this.servicePublishDataHolderService.getStepData<StepSevenDataInterface>(this.STEP));
        // console.log(this.servicePublishDataHolderService.getFullData());
        if (this.servicePublishDataHolderService.isset(this.STEP)) {
            this.formService.createForm(this.servicePublishDataHolderService.getStepData<StepSevenDataInterface>(this.STEP));
        } else {
            this.formService.createForm();
            this.formService.setCityDisabled(true);
        }
    }

    public submitForm(): void {
        // console.log(this.formService.form.getRawValue());
        // console.log(this.servicePublishDataHolderService.getStepData<StepSevenDataInterface>(this.STEP));
        this.servicePublishDataHolderService.assignStepData(this.STEP, this.formService.form.getRawValue());
        this.serviceStepsNavigationService.navigateToNextStep();
    }

    public onCountryChange(): void {
        this.formService.setCityDisabled(false);
    }

    public getCountryValue(): Country {
        return this.formService.getFormFieldValue(this.formFields.Country);
    }

    public getDepartureData(): StepSevenDepartureDataInterface {
        return this.servicePublishDataHolderService.getStepData<StepSevenDataInterface>(this.STEP)?.departure;
    }
}
