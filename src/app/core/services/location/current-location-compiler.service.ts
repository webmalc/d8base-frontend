import { Injectable } from '@angular/core';
import { NominatimReverseResponseInterface } from '@app/core/interfaces/nominatim-reverse-response-interface';
import { ExtendedLocation } from '@app/core/models/extended-location';
import { NominatimReverseResponse } from '@app/core/models/nominatim-reverse-response';
import { PostalCode } from '@app/core/models/postal-code';
import { HelperService } from '@app/core/services/helper.service';
import { CitiesApiService } from '@app/core/services/location/cities-api.service';
import { CountriesApiService } from '@app/core/services/location/countries-api.service';
import { LocationService } from '@app/core/services/location/location.service';
import { NominatimService } from '@app/core/services/location/nominatim.service';
import { PostalCodeApiService } from '@app/core/services/location/postal-code-api.service';
import { City } from '@app/profile/models/city';
import { Country } from '@app/profile/models/country';
import { Coords } from '@app/shared/interfaces/coords';
import { plainToClass } from 'class-transformer';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class CurrentLocationCompilerService {

    constructor(
        private readonly location: LocationService,
        private readonly nominatim: NominatimService,
        private readonly countryApi: CountriesApiService,
        private readonly cityApi: CitiesApiService,
        private readonly postalApi: PostalCodeApiService,
    ) {
    }

    public getCoords(country: Country, city?: City, postal?: PostalCode): Observable<Coords | null> {
        return this.nominatim.search(country, city, postal);
    }

    // readability
    public getExtendedLocationByCoords(coords: Coords): Observable<ExtendedLocation | null> {
        return this.getNominatimReverse(coords).pipe(
            switchMap(data => null === data ? of(null) : this.getCountryByTld(data.address.country_code).pipe(
                switchMap(country => null === country ?
                    of(null) :
                    this.getCity(data.getCityName(), country).pipe(
                        switchMap(city => null === city ?
                            of(null) :
                            this.getPostal(data.address.postcode, country, city).pipe(
                                map(postal => (country !== null || city !== null || postal !== null) ?
                                    plainToClass(
                                        ExtendedLocation,
                                        HelperService.clear({ country, city, postal, coords: this.getCoordsFromNominatim(data)}),
                                    ) :
                                    null,
                                ),
                            )),
                    )),
            )),
        );
    }

    public getCurrentLocation(): Observable<ExtendedLocation | null> {
        return this.location.getCurrentMergedPosition().pipe(
            switchMap(coords => null === coords ? of(null) : this.getExtendedLocationByCoords(coords)),
        );
    }

    private getCoordsFromNominatim(data: NominatimReverseResponseInterface): Coords {
        return { latitude: parseFloat(data.lat), longitude: parseFloat(data.lon)};
    }

    private getCountryByTld(tld: string): Observable<Country | null> {
        return this.countryApi.get({ tld}).pipe(
            map(res => res.count === 0 ? null : res.results.shift()),
        );
    }

    private getCity(name: string, country?: Country): Observable<City | null> {
        return this.cityApi.get({ by_name: name, country: country.id.toString()}).pipe(
            map(res => res.count === 0 ? null : res.results.shift()),
        );
    }

    private getPostal(postal: string, country?: Country, city?: City): Observable<PostalCode | null> {
        return this.postalApi.get({ search: postal, country: country.id.toString(), city: city.id.toString()}).pipe(
            map(res => res.count === 0 ? null : res.results.shift()),
        );
    }

    private getNominatimReverse(coords: Coords): Observable<NominatimReverseResponse | null> {
        return this.nominatim.reverse(coords);
    }
}
