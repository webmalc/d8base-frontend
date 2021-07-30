import { Injectable } from '@angular/core';
import { City } from '@app/api/models';
import { District } from '@app/core/models/district';
import { Region } from '@app/core/models/region';
import { Subregion } from '@app/core/models/subregion';
import {
  CitiesApiCache,
  CountriesApiCache,
  DistrictsApiCache,
  RegionsApiCache,
  SubregionsApiCache,
} from '@app/core/services/cache';
import { Country } from '@app/profile/models/country';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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

@Injectable()
export class LocationResolverService {
  constructor(
    private readonly countriesApi: CountriesApiCache,
    private readonly regionApi: RegionsApiCache,
    private readonly subregionApi: SubregionsApiCache,
    private readonly citiesApi: CitiesApiCache,
    private readonly districtApi: DistrictsApiCache,
  ) {}

  public getCountryCode(location: LocationInterface): Observable<string> {
    const countryId = location?.country;
    return !countryId
      ? of(null)
      : this.countriesApi.getByEntityId(countryId).pipe(
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

  public getFullLocation({
    country: countryId,
    region: regionId,
    subregion: subregionId,
    city: cityId,
    district: districtId,
  }: {
    country?: number;
    region?: number;
    subregion?: number;
    city?: number;
    district?: number;
  }): Observable<FullLocation> {
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
