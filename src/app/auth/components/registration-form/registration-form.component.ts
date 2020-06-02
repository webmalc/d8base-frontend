import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CityPickerPopoverComponent} from '@app/auth/components/city-picker-popover/city-picker-popover.component';
import {User} from '@app/core/models/user';
import {UserLocation} from '@app/core/models/user-location';
import {LocationService} from '@app/core/services/location/location.service';
import {City} from '@app/profile/models/city';
import {Country} from '@app/profile/models/country';
import {CitiesApiService} from '@app/profile/services/cities-api.service';
import {CountriesApiService} from '@app/profile/services/countries-api.service';
import {SelectableCityOnSearchService} from '@app/shared/services/selectable-city-on-search.service';
import {SelectableCountryOnSearchService} from '@app/shared/services/selectable-country-on-search.service';
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
export class RegistrationFormComponent implements OnInit {

    public errorMessage: string;
    public readonly formFields = RegistrationFormFields;
    public supposedCities$: BehaviorSubject<City> = new BehaviorSubject<City>(null);

    @Output() private readonly registrationFormData = new EventEmitter<{ user: User, location: UserLocation }>();

    constructor(
        public readonly registrationFormService: RegistrationFormService,
        private readonly countriesApi: CountriesApiService,
        private readonly citiesApi: CitiesApiService,
        private readonly locationService: LocationService,
        private readonly popoverController: PopoverController,
        public readonly countrySelectable: SelectableCountryOnSearchService,
        public readonly citySelectable: SelectableCityOnSearchService,
    ) {
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

    public getCountryValue(): Country {
        return this.registrationFormService.getFormFieldValue(this.formFields.Country);
    }

    private listenPopover(): void {
        this.supposedCities$.subscribe(
            (city: City) => {
                if (null !== city) {
                    this.countriesApi.getSingle(city.country).subscribe(
                        (country: Country) => {
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
