import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CityPickerPopoverComponent } from '@app/auth/components/city-picker-popover/city-picker-popover.component';
import { User } from '@app/core/models/user';
import { UserLocation } from '@app/core/models/user-location';
import { CountriesApiCache } from '@app/core/services/cache';
import { CitiesApiService } from '@app/core/services/location/cities-api.service';
import { CurrentPositionService } from '@app/core/services/location/current-position.service';
import { confirmPasswordValidator, passwordValidators } from '@app/core/validators/password-validators';
import { City } from '@app/profile/models/city';
import { Country } from '@app/profile/models/country';
import { SelectableCityOnSearchService } from '@app/shared/services/selectable-city-on-search.service';
import { SelectableCountryOnSearchService } from '@app/shared/services/selectable-country-on-search.service';
import { PopoverController } from '@ionic/angular';
import { plainToClass } from 'class-transformer';
import { BehaviorSubject } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { RegistrationFormFields } from '../../enums/registration-form-fields';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  public form: FormGroup = this.fb.group(
    {
      [RegistrationFormFields.Email]: ['', [Validators.required, Validators.email]],
      [RegistrationFormFields.Name]: ['', Validators.required],
      [RegistrationFormFields.Password]: ['', passwordValidators],
      [RegistrationFormFields.Confirm]: ['', passwordValidators],
      [RegistrationFormFields.Country]: ['', Validators.required],
      [RegistrationFormFields.City]: [{ value: '', disabled: true }],
      [RegistrationFormFields.Phone]: [''],
    },
    { validators: confirmPasswordValidator(RegistrationFormFields.Password, RegistrationFormFields.Confirm) },
  );
  @Input() public errorMessages: string[];
  public readonly formFields = RegistrationFormFields;
  public supposedCities$: BehaviorSubject<City> = new BehaviorSubject<City>(null);
  @Output() public readonly registrationFormData = new EventEmitter<{ user: User; location: UserLocation }>();

  private readonly distance = 15000;

  constructor(
    private readonly fb: FormBuilder,
    private readonly countriesApi: CountriesApiCache,
    private readonly popoverController: PopoverController,
    public readonly countrySelectable: SelectableCountryOnSearchService,
    public readonly citySelectable: SelectableCityOnSearchService,
    private readonly locationService: CurrentPositionService,
    private readonly citiesApi: CitiesApiService,
  ) {}

  public onPhoneFocus(phone: string): void {
    if (phone === '') {
      this.form.get(this.formFields.Phone).setValue('+');
    }
  }

  public onPhoneBlur(phone: string): void {
    if (phone === '+') {
      this.form.get(this.formFields.Phone).setValue('');
    }
  }

  public onPhoneInputChange(phone: string): void {
    const inputNumericVal = phone.replace(/\D/g, '');
    let inputNewValue = '';
    inputNewValue += `+${inputNumericVal}`;

    this.form.get(this.formFields.Phone).setValue(inputNewValue);
  }

  public onPhoneChange(phone: string): void {
    if (phone !== '+' && isNaN(parseInt(phone, 10)) && phone.slice(-1) === phone) {
      this.form.get(this.formFields.Phone).setValue(phone.slice(0, -1));
    }
  }

  public ngOnInit(): void {
    this.listenPopover();
    this.initPopover();
  }

  public submitRegistrationForm(): void {
    if (this.form.invalid) {
      return;
    }
    const formData: object = this.form.getRawValue();

    const user = plainToClass(User, formData, { excludeExtraneousValues: true });
    const location: UserLocation = new UserLocation();
    location.country = formData[this.formFields.Country].id;
    location.city = formData[this.formFields.City]?.id;
    this.registrationFormData.emit({ user, location });
  }

  public onCountryChange(): void {
    this.setCityDisabled(false);
    this.form.get(this.formFields.City).setValue(null);
  }

  private listenPopover(): void {
    this.supposedCities$.subscribe((city: City) => {
      if (null !== city) {
        this.countriesApi.getByEntityId(city.country).subscribe((country: Country) => {
          this.form.get(this.formFields.Country).setValue(country);
          this.form.get(this.formFields.City).setValue(city);
        });
      }
    });
  }

  private async initPopover(): Promise<void> {
    this.locationService.getMergedLocationData().then(location => {
      if (location && location.coordinates) {
        return this.citiesApi
          .getByLocation(this.distance, location)
          .pipe(
            first(),
            filter(cities => 0 !== cities.count),
          )
          .subscribe(cities => this.createPopover(cities.results));
      }
    });
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
    pop.onDidDismiss().then(data => {
      if (null !== data.data) {
        this.supposedCities$.next(data.data);
        this.setCityDisabled(false);
      }
    });
    await pop.present();
  }

  private setCityDisabled(value: boolean = true): void {
    const control = this.form.get(this.formFields.City);
    if (value) {
      control.disable();
    } else {
      control.enable();
    }
  }
}
