import { Injectable } from '@angular/core';
import { City, Country, District, Region, Subregion, UserLocation } from '@app/api/models';
import {
  CitiesApiCache,
  CountriesApiCache,
  DistrictsApiCache,
  RegionsApiCache,
  SubregionsApiCache,
} from '@app/core/services/cache';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export type BriefLocation = {
  country: Country;
  city: City;
};

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
  // codebeat:disable[ARITY]
  constructor(
    private readonly countriesApi: CountriesApiCache,
    private readonly regionApi: RegionsApiCache,
    private readonly subregionApi: SubregionsApiCache,
    private readonly citiesApi: CitiesApiCache,
    private readonly districtApi: DistrictsApiCache,
  ) {}

  public resolveLocation(location: UserLocation): Observable<BriefLocation> {
    return forkJoin({
      country: location.country ? this.countriesApi.getByEntityId(location.country) : of(null),
      city: location.city ? this.citiesApi.getByEntityId(location.city) : of(null),
    });
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
