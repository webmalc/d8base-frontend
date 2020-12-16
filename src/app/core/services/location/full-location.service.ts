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
import {ProfessionalLocationInline} from '../../../api/models';

export type FullLocation = {
    country: Country;
    region: Region;
    subregion: Subregion;
    city: City;
    district: District;
};

@Injectable({
    providedIn: 'root'
})
export class FullLocationService {
    constructor(
        private readonly countriesApi: CountriesApiService,
        private readonly regionApi: RegionApiService,
        private readonly subregionApi: SubregionApiService,
        private readonly citiesApi: CitiesApiService,
        private readonly districtApi: DistrictApiService
    ) {}

    public getFullLocation({
        country: countryId,
        region: regionId,
        subregion: subregionId,
        city: cityId,
        district: districtId
    }: ProfessionalLocationInline): Observable<FullLocation> {
        return forkJoin([
            this.countriesApi.getByEntityId(countryId).pipe(catchError(() => of(null))),
            this.regionApi.getByEntityId(regionId).pipe(catchError(() => of(null))),
            this.subregionApi.getByEntityId(subregionId).pipe(catchError(() => of(null))),
            this.citiesApi.getByEntityId(cityId).pipe(catchError(() => of(null))),
            this.districtApi.getByEntityId(districtId).pipe(catchError(() => of(null)))
        ]).pipe(
            map(([country, region, subregion, city, district]) => ({
                country,
                region,
                subregion,
                city,
                district
            }))
        );
    }
}
