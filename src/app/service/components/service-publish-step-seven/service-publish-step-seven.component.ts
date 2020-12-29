import {Component} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {LocationService} from '@app/core/services/location.service';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {MasterLocation} from '@app/master/models/master-location';
import {MasterSchedule} from '@app/master/models/master-schedule';
import {MasterLocationApiService} from '@app/master/services/master-location-api.service';
import {MasterScheduleApiService} from '@app/master/services/master-schedule-api.service';
import {City} from '@app/profile/models/city';
import {Country} from '@app/profile/models/country';
import {ServicePublishStepSevenFormFields} from '@app/service/enums/service-publish-step-seven-form-fields';
import {ServicePublishStepSevenTimetableFormFields} from '@app/service/enums/service-publish-step-seven-timetable-form-fields';
import {ServicePublishSteps} from '@app/service/enums/service-publish-steps';
import {ServicePublishStepSevenFormService} from '@app/service/forms/service-publish-step-seven-form.service';
import {StepFourDataInterface} from '@app/service/interfaces/step-four-data-interface';
import {StepSevenDataInterface} from '@app/service/interfaces/step-seven-data-interface';
import {StepTwoDataInterface} from '@app/service/interfaces/step-two-data-interface';
import {ServicePublishAuthStateManagerService} from '@app/service/services/service-publish-auth-state-manager.service';
import {ServicePublishDataHolderService} from '@app/service/services/service-publish-data-holder.service';
import {ServiceStepsNavigationService} from '@app/service/services/service-steps-navigation.service';
import {Reinitable} from '@app/shared/abstract/reinitable';
import {SelectableCityOnSearchService} from '@app/shared/services/selectable-city-on-search.service';
import {SelectableCountryOnSearchService} from '@app/shared/services/selectable-country-on-search.service';
import {SelectablePostalCodeOnSearchService} from '@app/shared/services/selectable-postal-code-on-search.service';
import {UserSettingsService} from '@app/shared/services/user-settings.service';
import {of} from 'rxjs';
import {first, map, switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-service-publish-step-seven',
    templateUrl: './service-publish-step-seven.component.html',
    styleUrls: ['./service-publish-step-seven.component.scss']
})
export class ServicePublishStepSevenComponent extends Reinitable {

    public formFields = ServicePublishStepSevenFormFields;
    public renderUseMasterSchedule: boolean = false;
    public defaultLocationList: MasterLocation[];
    public isUseDefaultLocation: boolean = false;
    public selectedSchedules = [];
    public masterSchedules = [];
    public serviceSchedules = [];
    public units: string[] = ['km', 'ml'];

    constructor(
        public readonly formService: ServicePublishStepSevenFormService,
        public readonly servicePublishDataHolderService: ServicePublishDataHolderService,
        public readonly countrySelectable: SelectableCountryOnSearchService,
        public readonly citySelectable: SelectableCityOnSearchService,
        public readonly postalSelectable: SelectablePostalCodeOnSearchService,
        public readonly serviceStepsNavigationService: ServiceStepsNavigationService,
        private readonly authStateManager: ServicePublishAuthStateManagerService,
        private readonly masterScheduleApi: MasterScheduleApiService,
        private readonly masterManager: MasterManagerService,
        private readonly userSetting: UserSettingsService,
        private readonly extendedLocation: LocationService,
        private readonly masterLocation: MasterLocationApiService
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
        if (this.isUseDefaultLocation) {
            const masterLocation: MasterLocation = this.formService.form.get(this.formFields.DefaultLocation).value;
            this.servicePublishDataHolderService.assignStepData(ServicePublishSteps.Final, {masterLocation});
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
            ) || (
                this.renderLocation() && !this.isUseDefaultLocation &&
                !this.formService.form.get(ServicePublishStepSevenFormFields.Country).value &&
                !this.formService.form.get(ServicePublishStepSevenFormFields.City).value &&
                !this.formService.form.get(ServicePublishStepSevenFormFields.Address).value &&
                !this.formService.form.get(ServicePublishStepSevenFormFields.Units).value &&
                !this.formService.form.get(ServicePublishStepSevenFormFields.MaxDistance).value
            ) || (
                this.isClientPlaceService() && !this.isUseDefaultLocation &&
                !this.formService.form.get(ServicePublishStepSevenFormFields.Units).value &&
                !this.formService.form.get(ServicePublishStepSevenFormFields.MaxDistance).value
            ) || (
                this.isMasterPlaceService() && !this.isUseDefaultLocation &&
                !this.formService.form.get(ServicePublishStepSevenFormFields.Address).value
            );
    }

    public renderLocation(): boolean {
        return this.servicePublishDataHolderService.getStepData<StepTwoDataInterface>(ServicePublishSteps.Two)?.service_type !== 'online';
    }

    public useDefaultLocation(): boolean {
        return this.formService.getFormFieldValue(this.formFields.UseDefaultLocation) as boolean;
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
        return this.servicePublishDataHolderService.getStepData<StepFourDataInterface>(ServicePublishSteps.Four)?.city;
    }

    public onThisPageDataChange(): void {
        this.servicePublishDataHolderService.assignStepData(ServicePublishSteps.Seven, this.formService.form.getRawValue());
    }

    public toggleUseMasterSchedule(event: CustomEvent): void {
        const checked: boolean = event.detail.checked;
        this.selectedSchedules = checked ? this.masterSchedules : this.serviceSchedules;
    }

    public toggleUseDefaultLocation(event: CustomEvent): void {
        this.isUseDefaultLocation = event.detail.checked;
    }

    public isClientPlaceService(): boolean {
        return this.servicePublishDataHolderService.getStepData<StepTwoDataInterface>(ServicePublishSteps.Two).service_type === 'client';
    }

    public isMasterPlaceService(): boolean {
        return this.servicePublishDataHolderService.getStepData<StepTwoDataInterface>(ServicePublishSteps.Two).service_type === 'professional';
    }

    protected init(): void {
        this.authStateManager.updateFourStepState();
        this.initMasterLocation();
        const stepData = this.servicePublishDataHolderService.getStepData<StepSevenDataInterface>(ServicePublishSteps.Seven);
        this.initSchedules(stepData);
        if (this.servicePublishDataHolderService.isset(ServicePublishSteps.Seven)) {
            this.formService.createForm(stepData);
        } else {
            this.formService.createForm();
            this.formService.setControlDisabled(true, this.formFields.City);
            this.formService.setControlDisabled(true, this.formFields.Postal);
        }
        this.disableIrrelevantControls();
        this.initDefaultUnits();
        this.initMaxDistance();
    }

    private disableIrrelevantControls(): void {
        const stepData = this.servicePublishDataHolderService.getStepData<StepTwoDataInterface>(ServicePublishSteps.Two);
        const serviceType = stepData.service_type;

        if (serviceType === 'online') {
            this.formService.setControlDisabled(true, this.formFields.Country);
            this.formService.setControlDisabled(true, this.formFields.City);
            this.formService.setControlDisabled(true, this.formFields.Address);
        }
        if (serviceType !== 'client') {
            this.formService.setControlDisabled(true, this.formFields.MaxDistance);
        }
    }

    private initMaxDistance(): void {
        if (!this.isClientPlaceService()) {
            this.formService.form.get(this.formFields.MaxDistance).setValue(0);
        }
    }

    private initMasterLocation(): void {
        this.masterManager.getMasterList().pipe(
            switchMap(list => list.length > 0 ?
                this.extendedLocation.getList<MasterLocation>(this.masterLocation) :
                of(null)
            )
        ).subscribe((res: MasterLocation[]) => {
            if (res && res.length > 0) {
                const defaultLocations = this.getCorrectLocations(res);
                if (defaultLocations.length > 0) {
                    this.defaultLocationList = defaultLocations;
                }
            }
        });
    }

    private getCorrectLocations(locations: MasterLocation[]): MasterLocation[] {
        const ret: MasterLocation[] = [];
        locations.forEach(
            loc => {
                if (this.checkDefaultLocation(loc)) {
                    ret.push(loc);
                }
            }
        );

        return ret;
    }

    private checkDefaultLocation(loc: MasterLocation): boolean {
        if (loc.country && loc.city) {
            const stepTwo = this.servicePublishDataHolderService.getStepData<StepTwoDataInterface>(ServicePublishSteps.Two);

            return !(stepTwo.service_type === 'professional' && !loc.address);
        }

        return false;
    }

    private initDefaultUnits(): void {
        this.userSetting.userSettings$.pipe(
            first()
        ).subscribe(settings => this.formService.form.get(this.formFields.Units).setValue(settings?.units));
    }

    private initSchedules(stepData: StepSevenDataInterface): void {
        this.masterManager.getMasterList().pipe(
            switchMap(list => list.length > 0 ?
                this.masterScheduleApi.get({professional: list[0].id.toString()}) : of(null)
            ),
            map((res: ApiListResponseInterface<MasterSchedule>) => null === res ? [] : res.results)
        ).subscribe(masterSchedule => {
            this.masterSchedules = masterSchedule;
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
                this.selectedSchedules = masterSchedule;
                this.formService.form.get(this.formFields.UseMasterSchedule).setValue(masterHasSchedules);
            }
        });
    }
}
