import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City, Country } from '@app/api/models';
import { LocationService } from '@app/api/services';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

const SOURCE_URI = 'https://extreme-ip-lookup.com/json/';

interface SourceData {
  businessName: string;
  businessWebsite: string;
  city: string;
  continent: string;
  country: string;
  countryCode: string;
  ipName: string;
  ipType: string;
  isp: string;
  lat: string;
  lon: string;
  org: string;
  query: string;
  region: string;
  status: string;
}

@Injectable()
export class GuessLocationByIpService {
  constructor(private readonly http: HttpClient, private readonly api: LocationService) {}

  public guess(): Observable<{ country: Country; city: City }> {
    const source$ = this.http.get<SourceData>(SOURCE_URI);
    return source$.pipe(
      mergeMap(data => {
        const { countryCode, city } = data;
        return this.api.locationCountriesList({ code: countryCode }).pipe(
          mergeMap(countries => {
            const country = countries.results[0];
            return forkJoin([of(country), this.api.locationCitiesList({ country: `${country.id}`, byName: city })]);
          }),
          map(([country, cities]) => ({ country, city: cities.results[0] })),
          catchError(() => of(null)),
        );
      }),
    );
  }
}
