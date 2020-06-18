import {Component, Input, OnInit} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {GridSizesInterface} from '@app/core/interfaces/grid-sizes-interface';
import {District} from '@app/core/models/district';
import {Region} from '@app/core/models/region';
import {Subregion} from '@app/core/models/subregion';
import {DistrictApiService} from '@app/core/services/location/district-api.service';
import {RegionApiService} from '@app/core/services/location/region-api.service';
import {SubregionApiService} from '@app/core/services/location/subregion-api.service';
import {TimezoneService} from '@app/core/services/timezone.service';
import {LocationTypes} from '@app/core/types/location-types';
import {City} from '@app/profile/models/city';
import {Country} from '@app/profile/models/country';
import {CitiesApiService} from '@app/profile/services/cities-api.service';
import {CountriesApiService} from '@app/profile/services/countries-api.service';
import {AbstractListComponent} from '@app/shared/components/abstract-list/abstract-list.component';
import {ClientLocationInterface} from '@app/shared/interfaces/client-location-interface';
import {LocationApiServiceInterface} from '@app/shared/interfaces/location-api-service-interface';
import {BehaviorSubject, forkJoin, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-location-list',
    templateUrl: './location-list.component.html',
    styleUrls: ['./location-list.component.scss'],
})
export class LocationListComponent extends AbstractListComponent<ClientLocationInterface> implements OnInit {

    @Input() public gridSizes: GridSizesInterface;
    @Input() public masterId: number;
    public timezoneList$: BehaviorSubject<Array<{ value: string, display_name: string }>> =
        new BehaviorSubject<Array<{ value: string, display_name: string }>>([]);

    constructor(
        private readonly countriesApi: CountriesApiService,
        private readonly regionApi: RegionApiService,
        private readonly subregionApi: SubregionApiService,
        private readonly citiesApi: CitiesApiService,
        private readonly districtApi: DistrictApiService,
        private readonly timezoneService: TimezoneService
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initTimezoneList();
        super.ngOnInit();
    }

    protected getItems(): Observable<ClientLocationInterface[]> {
        return (this.apiService as LocationApiServiceInterface).getByClientId(this.masterId).pipe(
            switchMap((data: ApiListResponseInterface<ClientLocationInterface>) => forkJoin({
                countries: this.countriesApi.getList(data.results.map(client => client.country as number)),
                regions: this.regionApi.getList(data.results.map(client => client.region as number)),
                subregions: this.subregionApi.getList(data.results.map(client => client.subregion as number)),
                cities: this.citiesApi.getList(data.results.map(client => client.city as number)),
                districts: this.districtApi.getList(data.results.map(client => client.district as number))
            }).pipe(
                map(({countries, regions, subregions, cities, districts}) =>
                    this.generateLocationList(data.results, countries, regions, subregions, cities, districts))
            ))
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
        this.timezoneService.getTimezoneList().subscribe(
            list => this.timezoneList$.next(list)
        );
    }
}
