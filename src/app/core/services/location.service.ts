import { Injectable } from '@angular/core';
import { ApiListResponseInterface } from '@app/core/interfaces/api-list-response.interface';
import { District } from '@app/core/models/district';
import { Region } from '@app/core/models/region';
import { Subregion } from '@app/core/models/subregion';
import { CitiesApiService } from '@app/core/services/location/cities-api.service';
import { CountriesApiService } from '@app/core/services/location/countries-api.service';
import { DistrictApiService } from '@app/core/services/location/district-api.service';
import { RegionApiService } from '@app/core/services/location/region-api.service';
import { SubregionApiService } from '@app/core/services/location/subregion-api.service';
import { LocationTypes } from '@app/core/types/location-types';
import { City } from '@app/profile/models/city';
import { Country } from '@app/profile/models/country';
import { ClientLocationInterface } from '@app/shared/interfaces/client-location-interface';
import { LocationApiServiceInterface } from '@app/shared/interfaces/location-api-service-interface';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LocationService {

  constructor(
    private readonly countriesApi: CountriesApiService,
    private readonly regionApi: RegionApiService,
    private readonly subregionApi: SubregionApiService,
    private readonly citiesApi: CitiesApiService,
    private readonly districtApi: DistrictApiService,
  ) {
  }

  public getSingle<T extends ClientLocationInterface>(api: LocationApiServiceInterface, id: number): Observable<T> {
    return api.getByEntityId(id).pipe(
      map(data => ({ results: [data] })),
      this.switch<T>(),
    ).pipe(
      map((data: T[]) => data.pop()),
    );
  }

  public getList<T extends ClientLocationInterface>(api: LocationApiServiceInterface): Observable<ClientLocationInterface[]> {
    return this.getLocationList(api);
  }

  private getLocationList(api: LocationApiServiceInterface, id?: number): Observable<ClientLocationInterface[]> {
    return api.getByClientId(id).pipe(
      map(data => data.results),
    );
  }

  private switch<T extends ClientLocationInterface>(): any {
    return switchMap((data: ApiListResponseInterface<ClientLocationInterface>) => forkJoin({
      countries: this.countriesApi.getList(data.results.map(client => client.country as number)),
      regions: this.regionApi.getList(data.results.map(client => client.region as number)),
      subregions: this.subregionApi.getList(data.results.map(client => client.subregion as number)),
      cities: this.citiesApi.getList(data.results.map(client => client.city as number)),
      districts: this.districtApi.getList(data.results.map(client => client.district as number)),
    }).pipe(
      map(({ countries, regions, subregions, cities, districts }) =>
        this.generateLocationList<T>(data.results, countries, regions, subregions, cities, districts)),
    ));
  }

  private generateLocationList<T extends ClientLocationInterface>(
    clientData: ClientLocationInterface[],
    countries: LocationTypes[],
    regions: LocationTypes[],
    subregions: LocationTypes[],
    cities: LocationTypes[],
    districts: LocationTypes[],
  ): T[] {
    clientData.forEach((clientLocationData, index) => {
      clientLocationData.country = countries[index] as Country;
      clientLocationData.region = regions[index] as Region;
      clientLocationData.subregion = subregions[index] as Subregion;
      clientLocationData.city = cities[index] as City;
      clientLocationData.district = districts[index] as District;
    });

    return clientData as T[];
  }
}
