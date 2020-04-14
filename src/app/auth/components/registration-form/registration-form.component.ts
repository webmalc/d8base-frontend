import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CityPickerPopoverComponent} from '@app/auth/components/city-picker-popover/city-picker-popover.component';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {LocationModel} from '@app/core/models/location.model';
import {User} from '@app/core/models/user';
import {LocationService} from '@app/core/services/location/location.service';
import {City} from '@app/profile/models/city';
import {Country} from '@app/profile/models/country';
import {CitiesApiService} from '@app/profile/services/cities-api.service';
import {CountriesApiService} from '@app/profile/services/countries-api.service';
import {PopoverController} from '@ionic/angular';
import {plainToClass} from 'class-transformer';
import {IonicSelectableComponent} from 'ionic-selectable';
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
    public countryList$: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>([]);
    public citiesList$: BehaviorSubject<City[]> = new BehaviorSubject<City[]>([]);
    public supposedCities$: BehaviorSubject<City> = new BehaviorSubject<City>(null);
    private cityListUploaded: boolean = false;

    @Output() private readonly registrationFormData = new EventEmitter<{ user: User, location: LocationModel }>();

    constructor(
        public readonly registrationFormService: RegistrationFormService,
        private countriesApi: CountriesApiService,
        private citiesApi: CitiesApiService,
        private locationService: LocationService,
        private popoverController: PopoverController
    ) {
    }

    public ngOnInit(): void {
        this.listenPopover();
        this.initPopover();
        this.registrationFormService.initForm();
    }

    public submitRegistrationForm(): void {
        const formData: object = this.registrationFormService.form.getRawValue();

        const user = plainToClass(User, formData, {excludeExtraneousValues: true});
        const location: LocationModel = new LocationModel();
        location.country = formData[this.formFields.Country].id;
        location.city = formData[this.formFields.City].id;
        this.registrationFormData.emit({user, location});
    }

    public onCountySelectClick(): void {
        this.countryList$.subscribe(
            list => 1 === list.length ? this.initCountries() : null
        );
    }

    public onCitySelectClick(): void {
        if (!this.cityListUploaded) {
            const selectedCountry: Country = this.registrationFormService.getFormFiledValue(RegistrationFormFields.Country);
            this.processCityList({country: selectedCountry.id.toString(10), page_size: '500'});
        }
    }

    public onCountryChange(event: { component: IonicSelectableComponent, value: Country }): void {
        this.processCityList({country: event.value.id.toString(10), page_size: '500'});
    }

    private processCityList(params: {country: string, page_size: string}): void {
        this.cityListUploaded = true;
        this.citiesApi.getList(params).subscribe(
            (data: ApiListResponseInterface<City>) => this.citiesList$.next(data.results)
        );
    }

    private listenPopover(): void {
        this.supposedCities$.subscribe(
            city => {
                if (null !== city) {
                    this.countriesApi.getSingle(city.country).subscribe(
                        county => {
                            this.countryList$.next([county]);
                            this.citiesList$.next([city]);
                            this.registrationFormService.setFormFiledValue(RegistrationFormFields.Country, county);
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
                        }
                        this.popoverController.dismiss();
                    }
                );
            }
        ));
    }

    private initCountries(): void {
        this.countriesApi.getList({page_size: '1000'}).subscribe(
            (data: ApiListResponseInterface<Country>) => this.countryList$.next(data.results)
        );
    }
}
