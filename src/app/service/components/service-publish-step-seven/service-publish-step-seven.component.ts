import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserLocation } from '@app/api/models';
import { defaultSchedule } from '@app/core/constants/schedule.constants';
import { updateAllValueAndValidity } from '@app/core/functions/form.functions';
import { ApiListResponseInterface } from '@app/core/interfaces/api-list-response.interface';
import { LocationService } from '@app/core/services/location.service';
import { MasterManagerService } from '@app/core/services/master-manager.service';
import { MasterLocation } from '@app/master/models/master-location';
import { MasterSchedule } from '@app/master/models/master-schedule';
import { MasterLocationApiService } from '@app/master/services/master-location-api.service';
import { MasterScheduleApiService } from '@app/master/services/master-schedule-api.service';
import { ServicePublishStepSevenFormFields } from '@app/service/enums/service-publish-step-seven-form-fields';
import { ServicePublishSteps } from '@app/service/enums/service-publish-steps';
import { StepSevenDataInterface } from '@app/service/interfaces/step-seven-data-interface';
import { StepTwoDataInterface } from '@app/service/interfaces/step-two-data-interface';
import { ServicePublishAuthStateManagerService } from '@app/service/services/service-publish-auth-state-manager.service';
import { ServicePublishDataHolderService } from '@app/service/services/service-publish-data-holder.service';
import { ServiceStepsNavigationService } from '@app/service/services/service-steps-navigation.service';
import { SelectableCountryOnSearchService } from '@app/shared/services/selectable-country-on-search.service';
import { SelectablePostalCodeOnSearchService } from '@app/shared/services/selectable-postal-code-on-search.service';
import { UserSettingsService } from '@app/shared/services/user-settings.service';
import UserLocationSelectors from '@app/store/current-user/user-locations/user-locations.selectors';
import { Select } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-service-publish-step-seven',
  templateUrl: './service-publish-step-seven.component.html',
  styleUrls: ['./service-publish-step-seven.component.scss'],
})
export class ServicePublishStepSevenComponent {
  public form: FormGroup;
  public formFields = ServicePublishStepSevenFormFields;
  public defaultLocationList: MasterLocation[];
  public selectedSchedules = defaultSchedule;
  public units: string[] = ['km', 'ml'];
  public masterHasSchedules: boolean;

  @Select(UserLocationSelectors.defaultLocation)
  public userLocation: Observable<UserLocation>;

  private masterSchedules = [];
  private serviceSchedules = [];

  constructor(
    public readonly servicePublishDataHolderService: ServicePublishDataHolderService,
    public readonly countrySelectable: SelectableCountryOnSearchService,
    public readonly postalSelectable: SelectablePostalCodeOnSearchService,
    public readonly serviceStepsNavigationService: ServiceStepsNavigationService,
    private readonly formBuilder: FormBuilder,
    private readonly authStateManager: ServicePublishAuthStateManagerService,
    private readonly masterScheduleApi: MasterScheduleApiService,
    private readonly masterManager: MasterManagerService,
    private readonly userSetting: UserSettingsService,
    private readonly extendedLocation: LocationService,
    private readonly masterLocation: MasterLocationApiService,
    private readonly cd: ChangeDetectorRef,
  ) {
    this.init();
  }

  public get useMasterSchedule(): boolean {
    return this.form.controls[this.formFields.UseMasterSchedule].value ?? false;
  }

  public set useMasterSchedule(value: boolean) {
    this.form.controls[this.formFields.UseMasterSchedule].setValue(value);
  }

  public get useDefaultLocation(): boolean {
    return this.form.controls[this.formFields.UseDefaultLocation].value;
  }

  public get needsLocation(): boolean {
    return (
      this.servicePublishDataHolderService.getStepData<StepTwoDataInterface>(ServicePublishSteps.Two)?.service_type !==
      'online'
    );
  }

  public get hasMasterLocations(): boolean {
    return Boolean(this.defaultLocationList?.length);
  }

  public submitForm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      updateAllValueAndValidity(this.form);
      return;
    }

    const data: StepSevenDataInterface = this.form.getRawValue();
    data.need_to_create_master_schedule = !this.useMasterSchedule;
    if (!this.useMasterSchedule) {
      data.use_master_schedule = true;
    }
    if (this.setServiceLocationByType) {
      const masterLocation: MasterLocation = this.form.get(this.formFields.DefaultLocation).value;
      this.servicePublishDataHolderService.assignStepData(ServicePublishSteps.Final, { masterLocation });
    }
    this.servicePublishDataHolderService.assignStepData(ServicePublishSteps.Seven, data);
    this.serviceStepsNavigationService.next();
  }

  public async updateStepData(): Promise<void> {
    await this.servicePublishDataHolderService.assignStepData(ServicePublishSteps.Seven, this.form.getRawValue());
  }

  public toggleUseMasterSchedule(event: CustomEvent): void {
    const checked: boolean = event.detail.checked;
    this.selectedSchedules = checked ? this.masterSchedules : this.serviceSchedules;
  }

  public toggleUseDefaultLocation(event: CustomEvent): void {
    const useDefaultLocation: boolean = event.detail.checked;
    this.disableIrrelevantControls(useDefaultLocation);
  }

  public isClientPlaceService(): boolean {
    return (
      this.servicePublishDataHolderService.getStepData<StepTwoDataInterface>(ServicePublishSteps.Two)?.service_type ===
      'client'
    );
  }

  private disableIrrelevantControls(useDefaultLocation: boolean): void {
    if (useDefaultLocation) {
      this.setControlDisabled(false, this.formFields.DefaultLocation);
      this.setControlDisabled(true, this.formFields.Country);
      this.setControlDisabled(true, this.formFields.City);
      this.setControlDisabled(true, this.formFields.Address);
    } else {
      this.setControlDisabled(true, this.formFields.DefaultLocation);
      this.setControlDisabled(false, this.formFields.Country);
      this.setControlDisabled(false, this.formFields.City);
      this.setControlDisabled(false, this.formFields.Address);
    }
  }

  private init(): void {
    this.authStateManager.updateFourStepState();
    this.initMasterLocation();
    const stepData = this.servicePublishDataHolderService.getStepData<StepSevenDataInterface>(
      ServicePublishSteps.Seven,
    );
    if (this.servicePublishDataHolderService.isset(ServicePublishSteps.Seven)) {
      this.createForm(stepData);
    } else {
      this.createForm();
    }
    this.initSchedules(stepData);
    this.setServiceLocationByType(stepData);
    this.initDefaultUnits();
    this.initMaxDistance();
  }

  private setServiceLocationByType(stepSevenData: StepSevenDataInterface): void {
    const stepData = this.servicePublishDataHolderService.getStepData<StepTwoDataInterface>(ServicePublishSteps.Two);
    const serviceType = stepData?.service_type;

    if (serviceType === 'online') {
      this.setControlDisabled(true, this.formFields.Country);
      this.setControlDisabled(true, this.formFields.City);
      this.setControlDisabled(true, this.formFields.Address);
      this.setControlDisabled(true, this.formFields.Postal);
      this.setControlDisabled(true, this.formFields.DefaultLocation);
      return;
    }
    if (serviceType !== 'client') {
      this.setControlDisabled(true, this.formFields.MaxDistance);
    }
    const useDefaultLocation = this.hasMasterLocations && (stepSevenData?.use_default_location ?? true);
    this.form.controls[this.formFields.UseDefaultLocation].setValue(useDefaultLocation);
    this.disableIrrelevantControls(useDefaultLocation);
  }

  private initMaxDistance(): void {
    if (!this.isClientPlaceService()) {
      this.form.get(this.formFields.MaxDistance).setValue(0);
    }
  }

  private initMasterLocation(): void {
    this.masterManager
      .getMasterList()
      .pipe(
        switchMap(list =>
          list.length > 0 ? this.extendedLocation.getList<MasterLocation>(this.masterLocation) : of(null),
        ),
      )
      .subscribe((res: MasterLocation[]) => {
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
    locations.forEach(loc => {
      if (this.checkDefaultLocation(loc)) {
        ret.push(loc);
      }
    });

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
    this.userSetting.userSettings$
      .pipe(first())
      .subscribe(settings => this.form.get(this.formFields.Units).setValue(settings?.units));
  }

  private initSchedules(stepData: StepSevenDataInterface): void {
    this.masterManager
      .getMasterList()
      .pipe(
        switchMap(list =>
          list.length > 0 ? this.masterScheduleApi.get({ professional: list[0].id.toString() }) : of(null),
        ),
        map((res: ApiListResponseInterface<MasterSchedule>) => (null === res ? [] : res.results)),
      )
      .subscribe(masterSchedule => {
        this.masterSchedules = masterSchedule;
        this.masterHasSchedules = this.masterSchedules.length > 0;
        this.useMasterSchedule = this.masterHasSchedules;
        if (stepData?.timetable?.length) {
          this.selectedSchedules = stepData.timetable;
          this.serviceSchedules = stepData.timetable;
        } else {
          this.selectedSchedules = masterSchedule;
        }
        this.cd.markForCheck();
      });
  }

  private createForm(data?: StepSevenDataInterface): void {
    this.form = this.formBuilder.group({
      [ServicePublishStepSevenFormFields.Country]: [data?.country, Validators.required],
      [ServicePublishStepSevenFormFields.City]: [data?.city, Validators.required],
      [ServicePublishStepSevenFormFields.Address]: [data?.address, Validators.required],
      [ServicePublishStepSevenFormFields.Postal]: [data?.postal_code],
      [ServicePublishStepSevenFormFields.PaymentCash]: [data?.payment_cash ?? false],
      [ServicePublishStepSevenFormFields.PaymentOnline]: [data?.payment_online ?? false],
      [ServicePublishStepSevenFormFields.UseMasterSchedule]: [data?.use_master_schedule ?? false],
      [ServicePublishStepSevenFormFields.UseDefaultLocation]: [data?.use_default_location ?? false],
      [ServicePublishStepSevenFormFields.MaxDistance]: [data?.max_distance, Validators.required],
      [ServicePublishStepSevenFormFields.Units]: [data?.units],
      [ServicePublishStepSevenFormFields.DefaultLocation]: [data?.default_location, Validators.required],
      [ServicePublishStepSevenFormFields.InstantBooking]: [data?.is_auto_order_confirmation],
    });
  }

  private setControlDisabled(val: boolean, controlName: string): void {
    const control = this.form.controls[controlName] as FormControl;
    val ? control.disable() : control.enable();
  }
}
