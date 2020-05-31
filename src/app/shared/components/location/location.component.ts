import {Component, Input, OnInit} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {Region} from '@app/core/models/region';
import {DistrictApiService} from '@app/core/services/location/district-api.service';
import {RegionApiService} from '@app/core/services/location/region-api.service';
import {SubregionApiService} from '@app/core/services/location/subregion-api.service';
import {SelectableCityOnSearchService} from '@app/core/services/selectable-city-on-search.service';
import {SelectableCountryOnSearchService} from '@app/core/services/selectable-country-on-search.service';
import {SelectableDistrictOnSearchService} from '@app/core/services/selectable-district-on-search.service';
import {SelectableRegionOnSearchService} from '@app/core/services/selectable-region-on-search.service';
import {SelectableSubregionOnSearchService} from '@app/core/services/selectable-subregion-on-search.service';
import {ListComponentTrait} from '@app/core/traits/list-component-trait';
import {LocationTypes} from '@app/core/types/location-types';
import {City} from '@app/profile/models/city';
import {Country} from '@app/profile/models/country';
import {CitiesApiService} from '@app/profile/services/cities-api.service';
import {CountriesApiService} from '@app/profile/services/countries-api.service';
import {LocationFormFields} from '@app/shared/enums/location-form-fields';
import {LocationFormService} from '@app/shared/forms/location-form.service';
import {ClientLocationInterface} from '@app/shared/interfaces/client-location-interface';
import {LocationApiServiceInterface} from '@app/shared/interfaces/location-api-service-interface';
import {BehaviorSubject, forkJoin} from 'rxjs';

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss'],
})
export class LocationComponent extends ListComponentTrait implements OnInit {

    @Input() public apiService: LocationApiServiceInterface;
    @Input() public masterId: number;
    @Input() public getClientLocationModel: (data: object) => ClientLocationInterface;
    public formFields = LocationFormFields;
    public timezoneList$: BehaviorSubject<Array<{ value: string, display_name: string }>> =
        new BehaviorSubject<Array<{ value: string, display_name: string }>>([]);
    public defaultDataForMaps: ClientLocationInterface[] = [];
    public locationsList: ClientLocationInterface[] = [];

    constructor(
        public readonly formService: LocationFormService,
        public readonly countrySelectable: SelectableCountryOnSearchService,
        public readonly citySelectable: SelectableCityOnSearchService,
        public readonly regionSelectable: SelectableRegionOnSearchService,
        public readonly selectableSubregion: SelectableSubregionOnSearchService,
        public readonly districtSelectable: SelectableDistrictOnSearchService,
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
        const rawForm: ClientLocationInterface[] = this.formService.form.getRawValue()[this.formFields.Location];
        const form: ClientLocationInterface[] = [];
        rawForm.forEach(location => form.push(this.getClientLocationModel(location)));
        const toCreate = this.getDataToCreate<ClientLocationInterface>(form, this.masterId);
        console.log(toCreate);
        const toUpdate = this.getDataToUpdate<ClientLocationInterface>(form, this.masterId, this.locationsList);
        console.log(toUpdate);
        const toDelete = this.getDataToDelete<ClientLocationInterface>(form, this.locationsList);
        console.log(toDelete);
        // if (this.defaultData) {
        //     this.apiService.update(this.getUpdatedLocationModel(form)).subscribe(
        //         res => console.log(res)
        //     );
        // } else {
        //     this.apiService.save(form).subscribe(
        //         res => console.log(res)
        //     );
        // }
    }

    public getCountryValue(index: number): Country {
        return this.formService.getFieldValue<Country>(index, LocationFormFields.Country);
    }

    public getRegionValue(index: number): Region {
        return this.formService.getFieldValue<Region>(index, LocationFormFields.Region);
    }

    public getCityValue(index: number): City {
        return this.formService.getFieldValue<City>(index, LocationFormFields.City);
    }

    public onCityChange(index: number): void {
        this.formService.setControlDisabled(false, this.formFields.District, index);
    }

    public onRegionChange(index: number): void {
        this.formService.setControlDisabled(false, this.formFields.Subregion, index);
    }

    public onCountryChange(index: number): void {
        this.formService.setControlDisabled(false, this.formFields.City, index);
        this.formService.setControlDisabled(false, this.formFields.Region, index);
    }

    // private getUpdatedLocationModel(location: ClientLocationInterface): ClientLocationInterface {
    //     location.id = this.defaultData.id;
    //
    //     return location;
    // }

    protected updateListAfterDelete(element: any): void {
    }

    protected updateListAfterPost(element: any): void {
    }

    private initForm(): void {
        this.apiService.get(this.masterId).subscribe(
            (data: ApiListResponseInterface<ClientLocationInterface>) => {
                this.defaultDataForMaps = data.results;
                this.createHashArray(data.results, this.locationsList);
                if (data.results.length === 0) {
                    return this.formService.createForm();
                }
                forkJoin({
                    countries: this.countriesApi.getListByIdArray(data.results.map(client => client.country)),
                    regions: this.regionApi.getListByIdArray(data.results.map(client => client.region)),
                    subregions: this.subregionApi.getListByIdArray(data.results.map(client => client.subregion)),
                    cities: this.citiesApi.getListByIdArray(data.results.map(client => client.city)),
                    districts: this.districtApi.getListByIdArray(data.results.map(client => client.district))
                }).subscribe(
                    ({countries, regions, subregions, cities, districts}) => {
                        this.formService.createForm(
                            this.generateLocationList(data.results, countries, regions, subregions, cities, districts)
                        );
                    }
                );
            }
        );
    }

    private generateLocationList(
        clientData: ClientLocationInterface[],
        countries: LocationTypes[],
        regions: LocationTypes[],
        subregions: LocationTypes[],
        cities: LocationTypes[],
        districts: LocationTypes[]
    ): ClientLocationInterface[] {
        clientData.forEach((clientLocationData, index) => {
            // @ts-ignore
            clientLocationData.country = countries[index];
            // @ts-ignore
            clientLocationData.region = regions[index];
            // @ts-ignore
            clientLocationData.subregion = subregions[index];
            // @ts-ignore
            clientLocationData.city = cities[index];
            // @ts-ignore
            clientLocationData.district = districts[index];
        });

        return clientData;
    }

    private initTimezoneList(): void {
        this.apiService.getTimeZoneList().subscribe(
            list => {
                this.timezoneList$.next(list.actions.POST.timezone.choices);
            });
    }
}
