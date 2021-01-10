import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CityPickerPopoverComponent } from '@app/auth/components/city-picker-popover/city-picker-popover.component';
import { User } from '@app/core/models/user';
import { UserLocation } from '@app/core/models/user-location';
import { CitiesApiService } from '@app/core/services/location/cities-api.service';
import { CountriesApiService } from '@app/core/services/location/countries-api.service';
import { LocationService } from '@app/core/services/location/location.service';
import { City } from '@app/profile/models/city';
import { Country } from '@app/profile/models/country';
import { SelectableCityOnSearchService } from '@app/shared/services/selectable-city-on-search.service';
import { SelectableCountryOnSearchService } from '@app/shared/services/selectable-country-on-search.service';
import { PopoverController } from '@ionic/angular';
import { plainToClass } from 'class-transformer';
import { BehaviorSubject } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { RegistrationFormFields } from '../../enums/registration-form-fields';
import { RegistrationFormService } from '../../forms/registration-form.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {

  @Input() public errorMessages: string[];
  public readonly formFields = RegistrationFormFields;
  public supposedCities$: BehaviorSubject<City> = new BehaviorSubject<City>(null);
  @Output() private readonly registrationFormData = new EventEmitter<{ user: User, location: UserLocation }>();
  private readonly distance = 15000;

  constructor(
    public readonly registrationFormService: RegistrationFormService,
    private readonly countriesApi: CountriesApiService,
    private readonly popoverController: PopoverController,
    public readonly countrySelectable: SelectableCountryOnSearchService,
    public readonly citySelectable: SelectableCityOnSearchService,
    private readonly locationService: LocationService,
    private readonly citiesApi: CitiesApiService,
  ) {
  }

  public onPhoneFocus(phone: string): void {
    if (phone === '') {
      this.registrationFormService.setFormFiledValue(this.formFields.Phone, '+');
    }
  }

  public onPhoneBlur(phone: string): void {
    if (phone === '+') {
      this.registrationFormService.setFormFiledValue(this.formFields.Phone, '');
    }
  }

  public onPhoneInputChange(phone: string): void {
    const inputNumericVal = phone.replace(/\D/g, '');
    let inputNewValue = '';
    inputNewValue += '+' + inputNumericVal;

    this.registrationFormService.setFormFiledValue(this.formFields.Phone, inputNewValue);
  }

  public onPhoneChange(phone: string): void {
    if (phone !== '+' && isNaN(parseInt(phone, 10)) && phone.slice(-1) === phone) {
      this.registrationFormService.setFormFiledValue(this.formFields.Phone, phone.slice(0, -1));
    }
  }

  public ngOnInit(): void {
    this.listenPopover();
    this.initPopover();
    this.registrationFormService.initForm();
    this.registrationFormService.setCityDisabled(true);
  }

  public submitRegistrationForm(): void {
    if (this.registrationFormService.form.invalid) {
      return;
    }
    const formData: object = this.registrationFormService.form.getRawValue();

    const user = plainToClass(User, formData, { excludeExtraneousValues: true });
    const location: UserLocation = new UserLocation();
    location.country = formData[this.formFields.Country].id;
    location.city = formData[this.formFields.City]?.id;
    this.registrationFormData.emit({ user, location });
  }

  public onCountryChange(): void {
    this.registrationFormService.setCityDisabled(false);
    this.registrationFormService.setFormFiledValue(this.formFields.City, null);
  }

  public getCountryValue(): Country {
    return this.registrationFormService.getFormFieldValue(this.formFields.Country);
  }

  private listenPopover(): void {
    this.supposedCities$.subscribe(
      (city: City) => {
        if (null !== city) {
          this.countriesApi.getByEntityId(city.country).subscribe(
            (country: Country) => {
              this.registrationFormService.setFormFiledValue(RegistrationFormFields.Country, country);
              this.registrationFormService.setFormFiledValue(RegistrationFormFields.City, city);
            },
          );
        }
      },
    );
  }

  private async initPopover(): Promise<void> {
    this.locationService.getMergedLocationData().then(
      location => {
        if (location && location.coordinates) {
          return this.citiesApi.getByLocation(this.distance, location).pipe(
            first(),
            filter(cities => 0 !== cities.count),
          ).subscribe(
            cities => this.createPopover(cities.results),
          );
        }
      },
    );
  }

  private async createPopover(cities: City[]): Promise<void> {
    const pop = await this.popoverController.create({
      component: CityPickerPopoverComponent,
      translucent: true,
      componentProps: {
        data: {
          cities,
        },
      },
    });
    pop.onDidDismiss().then(
      (data) => {
        if (null !== data.data) {
          this.supposedCities$.next(data.data);
          this.registrationFormService.setCityDisabled(false);
        }
      },
    );
    await pop.present();
  }
}
