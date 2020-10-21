import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ServicePublishStepSevenDepartureFormFields} from '@app/service/enums/service-publish-step-seven-departure-form-fields';
import {ServicePublishStepSevenDepartureFormService} from '@app/service/forms/service-publish-step-seven-departure-form.service';
import {ServicePublishDataHolderService} from '@app/service/services/service-publish-data-holder.service';

@Component({
    selector: 'app-departure',
    templateUrl: './departure.component.html',
    styleUrls: ['./departure.component.scss']
})
export class DepartureComponent implements OnInit {

    public static readonly departureDataKey = 'departure';
    public readonly formFields = ServicePublishStepSevenDepartureFormFields;
    public units: string[] = ['km', 'ml'];
    private readonly STEP = 6;

    constructor(
        public formService: ServicePublishStepSevenDepartureFormService,
        private readonly servicePublishDataHolder: ServicePublishDataHolderService,
        private readonly location: Location
    ) {
    }

    public ngOnInit(): void {
        if (this.servicePublishDataHolder.issetStepPartialData(this.STEP, DepartureComponent.departureDataKey)) {
            this.formService.createForm(this.servicePublishDataHolder.getPartialStepData(this.STEP, DepartureComponent.departureDataKey));
        } else {
            this.formService.createForm();
        }
    }

    public submitForm(): void {
        this.servicePublishDataHolder.assignStepData(
            this.STEP,
            {[DepartureComponent.departureDataKey]: this.formService.form.getRawValue()}
        );
        this.location.back();
    }
}
