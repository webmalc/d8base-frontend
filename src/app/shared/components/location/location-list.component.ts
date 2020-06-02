import {Component, Input, OnInit} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {District} from '@app/core/models/district';
import {Region} from '@app/core/models/region';
import {Subregion} from '@app/core/models/subregion';
import {DistrictApiService} from '@app/core/services/location/district-api.service';
import {RegionApiService} from '@app/core/services/location/region-api.service';
import {SubregionApiService} from '@app/core/services/location/subregion-api.service';
import {LocationTypes} from '@app/core/types/location-types';
import {City} from '@app/profile/models/city';
import {Country} from '@app/profile/models/country';
import {CitiesApiService} from '@app/profile/services/cities-api.service';
import {CountriesApiService} from '@app/profile/services/countries-api.service';
import {ClientLocationInterface} from '@app/shared/interfaces/client-location-interface';
import {LocationApiServiceInterface} from '@app/shared/interfaces/location-api-service-interface';
import {BehaviorSubject, forkJoin} from 'rxjs';

@Component({
    selector: 'app-location-list',
    templateUrl: './location-list.component.html',
    styleUrls: ['./location-list.component.scss'],
})
export class LocationListComponent implements OnInit {

    @Input() public apiService: LocationApiServiceInterface;
    @Input() public masterId: number;
    @Input() public getClientLocationModel: (data: object) => ClientLocationInterface;
    @Input() public getNewItem: () => ClientLocationInterface;
    public timezoneList$: BehaviorSubject<Array<{ value: string, display_name: string }>> =
        new BehaviorSubject<Array<{ value: string, display_name: string }>>([]);
    public locationsList: ClientLocationInterface[] = [];

    constructor(
        private readonly countriesApi: CountriesApiService,
        private readonly regionApi: RegionApiService,
        private readonly subregionApi: SubregionApiService,
        private readonly citiesApi: CitiesApiService,
        private readonly districtApi: DistrictApiService
    ) {
    }

    public ngOnInit(): void {
        this.initTimezoneList();
        this.init();
    }

    public saveLocation(location: ClientLocationInterface): void {
        if (!location.id) {
            this.apiService.save(this.getClientLocationModel(location)).subscribe(res => console.log(res));
        } else {
            this.apiService.update(this.getClientLocationModel(location)).subscribe(res => console.log(res));
        }
    }

    public deleteLocation(data: {index: number, data: ClientLocationInterface}): void {
        if (data.data.id) {
            this.apiService.delete(data.data).subscribe(res => console.log(res));
        }
        this.locationsList.splice(data.index, 1);
    }

    public addNewLocation(): void {
        this.locationsList.push(this.getNewItem());
    }

    private init(): void {
        this.apiService.get(this.masterId).subscribe(
            (data: ApiListResponseInterface<ClientLocationInterface>) => {
                forkJoin({
                    countries: this.countriesApi.getListByIdArray(data.results.map(client => client.country as number)),
                    regions: this.regionApi.getListByIdArray(data.results.map(client => client.region as number)),
                    subregions: this.subregionApi.getListByIdArray(data.results.map(client => client.subregion as number)),
                    cities: this.citiesApi.getListByIdArray(data.results.map(client => client.city as number)),
                    districts: this.districtApi.getListByIdArray(data.results.map(client => client.district as number))
                }).subscribe(
                    ({countries, regions, subregions, cities, districts}) => {
                        this.locationsList = this.generateLocationList(data.results, countries, regions, subregions, cities, districts);
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
            clientLocationData.country = countries[index] as Country;
            clientLocationData.region = regions[index] as Region;
            clientLocationData.subregion = subregions[index] as Subregion;
            clientLocationData.city = cities[index] as City;
            clientLocationData.district = districts[index] as District;
        });

        return clientData;
    }

    private initTimezoneList(): void {
        this.apiService.getTimeZoneList().subscribe(
            list => this.timezoneList$.next(list.actions.POST.timezone.choices)
        );
    }
}
