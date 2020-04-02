import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {LocationModel} from '@app/core/models/location.model';
import {User} from '@app/core/models/user';
import {City} from '@app/profile/models/city';
import {Country} from '@app/profile/models/country';
import {CitiesApiService} from '@app/profile/services/cities-api.service';
import {CountriesApiService} from '@app/profile/services/countries-api.service';
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

    @Output() private readonly registrationFormData = new EventEmitter<{user: User, location: LocationModel}>();

    constructor(
        public readonly registrationFormService: RegistrationFormService,
        private countriesApi: CountriesApiService,
        private citiesApi: CitiesApiService
    ) {
    }

    public ngOnInit(): void {
        this.registrationFormService.initForm();
        this.registrationFormService.setCityDisabled(true);
        this.initCountries();
    }

    public submitRegistrationForm(): void {
        const formData: object = this.registrationFormService.form.getRawValue();

        const user = plainToClass(User, formData, { excludeExtraneousValues: true });
        const location: LocationModel = new LocationModel();
        location.country = formData[this.formFields.Country].id;
        location.city = formData[this.formFields.City].id;

        this.registrationFormData.emit({user, location});
    }

    public onCountryChange(event: {component: IonicSelectableComponent, value: Country}): void {
        this.citiesApi.getList({country: event.value.id.toString(10), page_size: '500'}).subscribe(
            (data: ApiListResponseInterface<City>) => {
                this.citiesList$.next(data.results);
                this.registrationFormService.setCityDisabled(false);
            }
        );
    }

    private initCountries(): void {
        this.countriesApi.getList({page_size: '1000'}).subscribe(
            (data: ApiListResponseInterface<Country>) => this.countryList$.next(data.results)
        );
    }
}
