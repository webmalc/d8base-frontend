import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CityPickerPopoverComponent} from '@app/auth/components/city-picker-popover/city-picker-popover.component';
import {User} from '@app/core/models/user';
import {UserLocation} from '@app/core/models/user-location';
import {CountriesApiService} from '@app/core/services/location/countries-api.service';
import {City} from '@app/profile/models/city';
import {Country} from '@app/profile/models/country';
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
    styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

    public errorMessage: string;
    public readonly formFields = RegistrationFormFields;
    public supposedCities$: BehaviorSubject<City> = new BehaviorSubject<City>(null);

    @Output() private readonly registrationFormData = new EventEmitter<{ user: User, location: UserLocation }>();

    constructor(
        public readonly registrationFormService: RegistrationFormService,
        private readonly countriesApi: CountriesApiService,
        private readonly popoverController: PopoverController,
        public readonly countrySelectable: SelectableCountryOnSearchService,
        public readonly citySelectable: SelectableCityOnSearchService
    ) {
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

        const user = plainToClass(User, formData, {excludeExtraneousValues: true});
        const location: UserLocation = new UserLocation();
        location.country = formData[this.formFields.Country].id;
        location.city = formData[this.formFields.City].id;
        this.registrationFormData.emit({user, location});
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
                        }
                    );
                }
            }
        );
    }

    private async initPopover(): Promise<void> {
        const pop = await this.popoverController.create({
            component: CityPickerPopoverComponent,
            translucent: true
        });
        pop.onDidDismiss().then(
            (data) => {
                if (null !== data.data) {
                    this.supposedCities$.next(data.data);
                    this.registrationFormService.setCityDisabled(false);
                }
            }
        );
        await pop.present();
    }
}
