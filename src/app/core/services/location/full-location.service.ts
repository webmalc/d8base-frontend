import { Injectable } from '@angular/core';
import { District } from '@app/core/models/district';
import { Region } from '@app/core/models/region';
import { Subregion } from '@app/core/models/subregion';
import { CitiesApiService } from '@app/core/services/location/cities-api.service';
import { CountriesApiService } from '@app/core/services/location/countries-api.service';
import { DistrictApiService } from '@app/core/services/location/district-api.service';
import { RegionApiService } from '@app/core/services/location/region-api.service';
import { SubregionApiService } from '@app/core/services/location/subregion-api.service';
import { City } from '@app/profile/models/city';
import { Country } from '@app/profile/models/country';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProfessionalLocationInline } from '../../../api/models';

export type FullLocation = {
  country: Country;
  region: Region;
  subregion: Subregion;
  city: City;
  district: District;
};

export interface LocationInterface {
  address?: null | string;
  city?: null | number;
  country?: null | number;
  id?: number;
}

@Injectable({
  providedIn: 'root',
})
export class FullLocationService {
  constructor(
    private readonly countriesApi: CountriesApiService,
    private readonly regionApi: RegionApiService,
    private readonly subregionApi: SubregionApiService,
    private readonly citiesApi: CitiesApiService,
    private readonly districtApi: DistrictApiService,
  ) {
  }

  public getCountryCode(location: LocationInterface): Observable<string> {
    const countryId = location?.country;
    return !countryId ? of(null) :
      this.countriesApi.getByEntityId(countryId).pipe(
        map(country => country.code),
        catchError(() => of(null)),
      );
  }

  public getTextLocation(
    location: LocationInterface,
    shortFormat: boolean = false,
  ): Observable<{ id: number; text: string }> {
    if (!location) {
      return of({
        id: null,
        text: null,
      });
    }

    return this.getFullLocation(location).pipe(
      map(res => {
        let locationElements = ['country', 'city'].map(key => res?.[key]?.name);
        if (!shortFormat) {
          locationElements = locationElements.concat(location.address);
        }

        return {
          id: location.id,
          text: locationElements.filter(value => Boolean(value)).join(', '),
        };
      }),
    );
  }

  private getFullLocation({
                            country: countryId,
                            region: regionId,
                            subregion: subregionId,
                            city: cityId,
                            district: districtId,
                          }: ProfessionalLocationInline): Observable<FullLocation> {
    return forkJoin([
      countryId ? this.countriesApi.getByEntityId(countryId).pipe(catchError(() => of(null))) : of(null),
      regionId ? this.regionApi.getByEntityId(regionId).pipe(catchError(() => of(null))) : of(null),
      subregionId ? this.subregionApi.getByEntityId(subregionId).pipe(catchError(() => of(null))) : of(null),
      cityId ? this.citiesApi.getByEntityId(cityId).pipe(catchError(() => of(null))) : of(null),
      districtId ? this.districtApi.getByEntityId(districtId).pipe(catchError(() => of(null))) : of(null),
    ]).pipe(
      map(([country, region, subregion, city, district]) => ({
        country,
        region,
        subregion,
        city,
        district,
      })),
    );
  }
}
