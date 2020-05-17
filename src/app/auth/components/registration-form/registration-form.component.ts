import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CityPickerPopoverComponent} from '@app/auth/components/city-picker-popover/city-picker-popover.component';
import {User} from '@app/core/models/user';
import {UserLocation} from '@app/core/models/user-location';
import {LocationService} from '@app/core/services/location/location.service';
import {CountryCitySelectTrait} from '@app/core/traits/country-city-select-trait';
import {City} from '@app/profile/models/city';
import {Country} from '@app/profile/models/country';
import {CitiesApiService} from '@app/profile/services/cities-api.service';
import {CountriesApiService} from '@app/profile/services/countries-api.service';
import {PopoverController} from '@ionic/angular';
import {plainToClass} from 'class-transformer';
import {BehaviorSubject} from 'rxjs';
import {RegistrationFormFields} from '../../enums/registration-form-fields';
import {RegistrationFormService} from '../../forms/registration-form.service';

@Component({
    selector: 'app-registration-form',
    templateUrl: './registration-form.component.html',
    styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent extends CountryCitySelectTrait implements OnInit {

    public errorMessage: string;
    public readonly formFields = RegistrationFormFields;
    public supposedCities$: BehaviorSubject<City> = new BehaviorSubject<City>(null);

    @Output() private readonly registrationFormData = new EventEmitter<{ user: User, location: UserLocation }>();

    constructor(
        public readonly registrationFormService: RegistrationFormService,
        private readonly countriesApi: CountriesApiService,
        private readonly citiesApi: CitiesApiService,
        private readonly locationService: LocationService,
        private readonly popoverController: PopoverController
    ) {
        super();
    }

    public ngOnInit(): void {
        this.listenPopover();
        this.initPopover();
        this.registrationFormService.initForm();
        this.registrationFormService.setCityDisabled(true);
    }

    public submitRegistrationForm(): void {
        const formData: object = this.registrationFormService.form.getRawValue();

        const user = plainToClass(User, formData, {excludeExtraneousValues: true});
        const location: UserLocation = new UserLocation();
        location.country = formData[this.formFields.Country].id;
        location.city = formData[this.formFields.City].id;
        this.registrationFormData.emit({user, location});
    }

    public onCountryChange(): void {
        this.registrationFormService.setCityDisabled(false);
    }

    protected getCitiesApiService(): CitiesApiService {
        return this.citiesApi;
    }

    protected getCountriesApiService(): CountriesApiService {
        return this.countriesApi;
    }

    protected getCountyFormField(): string {
        return this.formFields.Country;
    }

    protected getFormService(): { getFormFieldValue(formField: string): any } {
        return this.registrationFormService;
    }

    private listenPopover(): void {
        this.supposedCities$.subscribe(
            (city: City) => {
                if (null !== city) {
                    this.countriesApi.getSingle(city.country).subscribe(
                        (country: Country) => {
                            this.countryList$.next([country]);
                            this.citiesList$.next([city]);
                            this.registrationFormService.setFormFiledValue(RegistrationFormFields.Country, country);
                            this.registrationFormService.setFormFiledValue(RegistrationFormFields.City, city);
                        }
                    );
                }
            }
        );
    }

    private initPopover(): void {
        this.popoverController.create({
            component: CityPickerPopoverComponent,
            translucent: true
        }).then(pop => pop.present().then(
            () => {
                CityPickerPopoverComponent.city$.subscribe(
                    (city: City) => {
                        if (null !== city) {
                            this.supposedCities$.next(city);
                            this.registrationFormService.setCityDisabled(false);
                        }
                        this.popoverController.dismiss();
                    }
                );
            }
        ));
    }
}
