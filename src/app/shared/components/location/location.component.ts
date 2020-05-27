import {Component, Input, OnInit} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {District} from '@app/core/models/district';
import {Region} from '@app/core/models/region';
import {Subregion} from '@app/core/models/subregion';
import {DistrictApiService} from '@app/core/services/location/district-api.service';
import {RegionApiService} from '@app/core/services/location/region-api.service';
import {SubregionApiService} from '@app/core/services/location/subregion-api.service';
import {CountryCitySelectTrait} from '@app/core/traits/country-city-select-trait';
import {City} from '@app/profile/models/city';
import {Country} from '@app/profile/models/country';
import {CitiesApiService} from '@app/profile/services/cities-api.service';
import {CountriesApiService} from '@app/profile/services/countries-api.service';
import {LocationFormFields} from '@app/shared/enums/location-form-fields';
import {LocationFormService} from '@app/shared/forms/location-form.service';
import {ClientLocationInterface} from '@app/shared/interfaces/client-location-interface';
import {LocationApiServiceInterface} from '@app/shared/interfaces/location-api-service-interface';
import {IonicSelectableComponent} from 'ionic-selectable';
import {BehaviorSubject, forkJoin, of} from 'rxjs';

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss'],
})
export class LocationComponent extends CountryCitySelectTrait implements OnInit {

    @Input() public apiService: LocationApiServiceInterface;
    @Input() public masterId: number;
    @Input() public getClientLocationModel: (data: object) => ClientLocationInterface;
    public formFields = LocationFormFields;
    public regionList$: BehaviorSubject<Region[]> = new BehaviorSubject<Region[]>([]);
    public subregionList$: BehaviorSubject<Subregion[]> = new BehaviorSubject<Subregion[]>([]);
    public districtList$: BehaviorSubject<District[]> = new BehaviorSubject<District[]>([]);
    public timezoneList$: BehaviorSubject<Array<{ value: string, display_name: string }>> =
        new BehaviorSubject<Array<{ value: string, display_name: string }>>([]);
    public clientLocationList: BehaviorSubject<ClientLocationInterface[]> = new BehaviorSubject<ClientLocationInterface[]>([]);
    private defaultData: ClientLocationInterface = null;

    constructor(
        public formService: LocationFormService,
        private readonly countriesApi: CountriesApiService,
        private readonly regionApi: RegionApiService,
        private readonly subregionApi: SubregionApiService,
        private readonly citiesApi: CitiesApiService,
        private readonly districtApi: DistrictApiService
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initTimezoneList();
        this.initForm();
    }

    public submitForm(): void {
        const form = this.getClientLocationModel(this.formService.form.getRawValue());
        if (this.defaultData) {
            this.apiService.update(this.getUpdatedLocationModel(form)).subscribe(
                res => console.log(res)
            );
        } else {
            this.apiService.save(form).subscribe(
                res => console.log(res)
            );
        }
    }

    public onDistrictSearch(event: { component: IonicSelectableComponent, text: string }): void {
        const city: City = this.formService.getFormFieldValue(this.formFields.City);
        this.abstractOnSearch(
            event.component,
            event.text,
            this.districtApi,
            {city: city?.id.toString(10)}
        );
    }

    public onSubregionSearch(event: { component: IonicSelectableComponent, text: string }): void {
        const country: Country = this.formService.getFormFieldValue(this.formFields.Country);
        const region: Region = this.formService.getFormFieldValue(this.formFields.Region);
        this.abstractOnSearch(
            event.component,
            event.text,
            this.subregionApi,
            {country: country?.id.toString(10), region: region?.id.toString(10)}
        );
    }

    public onRegionSearch(event: { component: IonicSelectableComponent, text: string }): void {
        const country: Country = this.formService.getFormFieldValue(this.formFields.Country);
        this.abstractOnSearch(
            event.component,
            event.text,
            this.regionApi,
            {country: country?.id.toString(10)}
        );
    }

    public onCityChange(): void {
        this.formService.setControlDisabled(false, this.formFields.District);
    }

    public onRegionChange(): void {
        this.formService.setControlDisabled(false, this.formFields.Subregion);
    }

    public onCountryChange(): void {
        this.formService.setControlDisabled(false, this.formFields.City);
        this.formService.setControlDisabled(false, this.formFields.Region);
    }

    protected getFormService(): { getFormFieldValue(formField: string): string } {
        return this.formService;
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

    private getUpdatedLocationModel(location: ClientLocationInterface): ClientLocationInterface {
        location.id = this.defaultData.id;

        return location;
    }

    private initForm(): void {
        this.apiService.get(this.masterId).subscribe(
            (data: ApiListResponseInterface<ClientLocationInterface>) => {
                this.defaultData = data.results[0];
                this.clientLocationList.next(data.results);
                if (data.results.length === 0) {
                    return this.formService.createForm();
                }
                forkJoin({
                    country: data.results[0]?.country ? this.countriesApi.getSingle(data.results[0].country) : of(null),
                    region: data.results[0]?.region ? this.regionApi.getSingle(data.results[0].region) : of(null),
                    subregion: data.results[0]?.subregion ? this.subregionApi.getSingle(data.results[0].subregion) : of(null),
                    city: data.results[0]?.city ? this.citiesApi.getSingle(data.results[0].city) : of(null),
                    district: data.results[0]?.district ? this.districtApi.getSingle(data.results[0].district) : of(null)
                }).subscribe(
                    ({country, region, subregion, city, district}) => {
                        data.results[0].country = country;
                        data.results[0].region = region;
                        data.results[0].subregion = subregion;
                        data.results[0].city = city;
                        data.results[0].district = district;
                        this.formService.createForm(data.results[0]);
                    }
                );
            }
        );
    }

    private initTimezoneList(): void {
        this.apiService.getTimeZoneList().subscribe(
            list => {
                this.timezoneList$.next(list.actions.POST.timezone.choices);
            });
    }
}
