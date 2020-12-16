import {Component} from '@angular/core';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {TranslationService} from '@app/core/services/translation.service';
import {MasterScheduleApiService} from '@app/master/services/master-schedule-api.service';
import {City} from '@app/profile/models/city';
import {Country} from '@app/profile/models/country';
import {ServicePublishStepSevenFormFields} from '@app/service/enums/service-publish-step-seven-form-fields';
import {ServicePublishStepSevenTimetableFormFields} from '@app/service/enums/service-publish-step-seven-timetable-form-fields';
import {ServicePublishSteps} from '@app/service/enums/service-publish-steps';
import {ServicePublishStepSevenFormService} from '@app/service/forms/service-publish-step-seven-form.service';
import {StepSevenDataInterface} from '@app/service/interfaces/step-seven-data-interface';
import {StepSevenDepartureDataInterface} from '@app/service/interfaces/step-seven-departure-data-interface';
import {ServicePublishAuthStateManagerService} from '@app/service/services/service-publish-auth-state-manager.service';
import {ServicePublishDataHolderService} from '@app/service/services/service-publish-data-holder.service';
import {ServiceStepsNavigationService} from '@app/service/services/service-steps-navigation.service';
import {Reinitable} from '@app/shared/abstract/reinitable';
import {SelectableCityOnSearchService} from '@app/shared/services/selectable-city-on-search.service';
import {SelectableCountryOnSearchService} from '@app/shared/services/selectable-country-on-search.service';
import {SelectablePostalCodeOnSearchService} from '@app/shared/services/selectable-postal-code-on-search.service';
import {of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-service-publish-step-seven',
    templateUrl: './service-publish-step-seven.component.html',
    styleUrls: ['./service-publish-step-seven.component.scss']
})
export class ServicePublishStepSevenComponent extends Reinitable {

    public formFields = ServicePublishStepSevenFormFields;
    public renderUseMasterSchedule: boolean = false;
    public selectedSchedules = [];
    public masterSchedules = [];
    public serviceSchedules = [];

    constructor(
        public readonly formService: ServicePublishStepSevenFormService,
        public readonly trans: TranslationService,
        public readonly servicePublishDataHolderService: ServicePublishDataHolderService,
        public readonly countrySelectable: SelectableCountryOnSearchService,
        public readonly citySelectable: SelectableCityOnSearchService,
        public readonly postalSelectable: SelectablePostalCodeOnSearchService,
        public readonly serviceStepsNavigationService: ServiceStepsNavigationService,
        private readonly authStateManager: ServicePublishAuthStateManagerService,
        private readonly masterScheduleApi: MasterScheduleApiService,
        private readonly masterManager: MasterManagerService
    ) {
        super();
    }

    public submitForm(): void {
        let data: StepSevenDataInterface;
        data = this.formService.form.getRawValue();
        data.need_to_create_master_schedule = !this.renderUseMasterSchedule;
        if (!this.renderUseMasterSchedule) {
            data.use_master_schedule = true;
        }
        this.servicePublishDataHolderService.assignStepData(ServicePublishSteps.Seven, data);
        this.serviceStepsNavigationService.next();
    }

    public isSubmitDisabled(): boolean {
        return (this.formService.form.invalid) ||
            (
                !this.formService.form.get(ServicePublishStepSevenFormFields.PaymentOnline).value &&
                !this.formService.form.get(ServicePublishStepSevenFormFields.PaymentCash).value
            ) ||
            (
                !this.formService.form.get(ServicePublishStepSevenFormFields.UseMasterSchedule).value &&
                (JSON.stringify(this.servicePublishDataHolderService.getPartialStepData(
                    ServicePublishSteps.Seven, ServicePublishStepSevenTimetableFormFields.Timetable
                )) === '{}' || JSON.stringify(this.servicePublishDataHolderService.getPartialStepData(
                    ServicePublishSteps.Seven, ServicePublishStepSevenTimetableFormFields.Timetable
                )) === undefined)
            ) ||
            !this.servicePublishDataHolderService.getStepData<StepSevenDataInterface>(ServicePublishSteps.Seven).departure?.max_distance;
    }

    public useMasterSchedule(): boolean {
        return this.formService.getFormFieldValue(this.formFields.UseMasterSchedule) as boolean;
    }

    public onCountryChange(): void {
        this.formService.setControlDisabled(false, this.formFields.City);
    }

    public onCityChange(): void {
        this.formService.setControlDisabled(false, this.formFields.Postal);
    }

    public getCountryValue(): Country {
        return this.formService.getFormFieldValue(this.formFields.Country);
    }

    public getCityValue(): City {
        return this.formService.getFormFieldValue(this.formFields.City);
    }

    public getDepartureData(): StepSevenDepartureDataInterface {
        return this.servicePublishDataHolderService.getStepData<StepSevenDataInterface>(ServicePublishSteps.Seven)?.departure;
    }

    public onThisPageDataChange(): void {
        this.servicePublishDataHolderService.assignStepData(ServicePublishSteps.Seven, this.formService.form.getRawValue());
    }

    public toggleUseMasterSchedule(event: CustomEvent): void {
        const checked: boolean = event.detail.checked;
        this.selectedSchedules = checked ? this.masterSchedules : this.serviceSchedules;
    }

    protected init(): void {
        this.authStateManager.updateFourStepState();
        const stepData = this.servicePublishDataHolderService.getStepData<StepSevenDataInterface>(ServicePublishSteps.Seven);
        this.initSchedules(stepData);
        if (this.servicePublishDataHolderService.isset(ServicePublishSteps.Seven)) {
            this.formService.createForm(stepData);
        } else {
            this.formService.createForm();
            this.formService.setControlDisabled(true, this.formFields.City);
            this.formService.setControlDisabled(true, this.formFields.Postal);
        }
    }

    private initSchedules(stepData: StepSevenDataInterface): void {
        this.masterManager.getMasterList().pipe(
            switchMap(list => list.length > 0 ?
                this.masterScheduleApi.get({professional: list[0].id.toString()}) : of(null)
            )
        ).subscribe(masterSchedule => {
            this.masterSchedules = masterSchedule.results;
            const masterHasSchedules = this.masterSchedules.length > 0;
            this.renderUseMasterSchedule = masterHasSchedules;
            if (stepData?.timetable?.length) {
                if (stepData.use_master_schedule) {
                    this.masterSchedules = stepData.timetable;
                } else {
                    this.serviceSchedules = stepData.timetable;
                }
                this.selectedSchedules = stepData.timetable;
            } else {
                this.selectedSchedules = masterSchedule.results;
                this.formService.form.get(this.formFields.UseMasterSchedule).setValue(masterHasSchedules);
            }
        });
    }
}
