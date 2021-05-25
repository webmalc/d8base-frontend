import { Injectable } from '@angular/core';
import { City, Country, PostalCode } from '@app/api/models';
import { LocationService } from '@app/api/services';
import { NominatimReverseResponseInterface } from '@app/core/interfaces/nominatim-reverse-response-interface';
import { ExtendedLocation } from '@app/core/models/extended-location';
import { NominatimReverseResponse } from '@app/core/models/nominatim-reverse-response';
import { HelperService } from '@app/core/services/helper.service';
import { CurrentPositionService } from '@app/core/services/location/current-position.service';
import { NominatimService } from '@app/core/services/location/nominatim.service';
import { Coords } from '@app/shared/interfaces/coords';
import { plainToClass } from 'class-transformer';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CurrentLocationCompilerService {
  constructor(
    private readonly location: CurrentPositionService,
    private readonly nominatim: NominatimService,
    private readonly locationApi: LocationService,
  ) {}

  public getCoords(country: Country, city?: City, postal?: PostalCode): Observable<Coords | null> {
    return this.nominatim.search(country, city, postal);
  }

  // readability
  public getExtendedLocationByCoords(coords: Coords): Observable<ExtendedLocation | null> {
    return this.getNominatimReverse(coords).pipe(
      switchMap(data =>
        null === data
          ? of(null)
          : this.getCountryByTld(data.address.country_code).pipe(
              switchMap(country =>
                null === country
                  ? of(null)
                  : this.getCity(data.getCityName(), country).pipe(
                      switchMap(city =>
                        null === city
                          ? of(null)
                          : this.getPostal(data.address.postcode, country, city).pipe(
                              map(postal =>
                                country !== null || city !== null || postal !== null
                                  ? plainToClass(
                                      ExtendedLocation,
                                      HelperService.clear({
                                        country,
                                        city,
                                        postal,
                                        coords: this.getCoordsFromNominatim(data),
                                      }),
                                    )
                                  : null,
                              ),
                            ),
                      ),
                    ),
              ),
            ),
      ),
    );
  }

  public getCurrentLocation(): Observable<ExtendedLocation | null> {
    return this.location
      .getCurrentMergedPosition()
      .pipe(switchMap(coords => (null === coords ? of(null) : this.getExtendedLocationByCoords(coords))));
  }

  private getCoordsFromNominatim(data: NominatimReverseResponseInterface): Coords {
    return { latitude: parseFloat(data.lat), longitude: parseFloat(data.lon) };
  }

  private getCountryByTld(tld: string): Observable<Country | null> {
    return this.locationApi
      .locationCountriesList({ tld })
      .pipe(map(res => (res.count === 0 ? null : res.results.shift())));
  }

  private getCity(name: string, country?: Country): Observable<City | null> {
    return this.locationApi
      .locationCitiesList({ search: name, country: country.id.toString() })
      .pipe(map(res => (res.count === 0 ? null : res.results.shift())));
  }

  private getPostal(postal: string, country?: Country, city?: City): Observable<PostalCode | null> {
    return this.locationApi
      .locationPostalCodesList({ search: postal, country: country.id.toString(), city: city.id.toString() })
      .pipe(map(res => (res.count === 0 ? null : res.results.shift())));
  }

  private getNominatimReverse(coords: Coords): Observable<NominatimReverseResponse | null> {
    return this.nominatim.reverse(coords);
  }
}
