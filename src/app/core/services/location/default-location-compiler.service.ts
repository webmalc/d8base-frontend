import {Injectable} from '@angular/core';
import {NominatimReverseResponseInterface} from '@app/core/interfaces/nominatim-reverse-response-interface';
import {DefaultLocation} from '@app/core/models/default-location';
import {PostalCode} from '@app/core/models/postal-code';
import {HelperService} from '@app/core/services/helper.service';
import {CitiesApiService} from '@app/core/services/location/cities-api.service';
import {CountriesApiService} from '@app/core/services/location/countries-api.service';
import {LocationService} from '@app/core/services/location/location.service';
import {NominatimService} from '@app/core/services/location/nominatim.service';
import {PostalCodeApiService} from '@app/core/services/location/postal-code-api.service';
import {City} from '@app/profile/models/city';
import {Country} from '@app/profile/models/country';
import {Coords} from '@app/shared/interfaces/coords';
import {plainToClass} from 'class-transformer';
import {from, Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DefaultLocationCompilerService {

    constructor(
        private readonly location: LocationService,
        private readonly nominatim: NominatimService,
        private readonly countryApi: CountriesApiService,
        private readonly cityApi: CitiesApiService,
        private readonly postalApi: PostalCodeApiService
    ) {
    }

    public getDefaultLocation(): Observable<DefaultLocation | null> {
        return from(this.location.getMergedLocationData()).pipe(
            switchMap(userLocation => userLocation === null ? of(null) : this.getNominatimReverse(
                {latitude: userLocation.coordinates.coordinates[1], longitude: userLocation.coordinates.coordinates[0]}).pipe(
                switchMap(data => this.getCountryByTld(data.address.country_code).pipe(
                    switchMap(country => country === null ?
                        of(null)
                        : this.getCity(data.address.city ? data.address.city : data.address.town, country).pipe(
                            switchMap(city => city === null ?
                                of(null) :
                                this.getPostal(data.address.postcode, country, city).pipe(
                                    map(postal => (country !== null || city !== null || postal !== null) ?
                                        plainToClass(DefaultLocation, HelperService.clear({country, city, postal})) :
                                        null
                                    )
                                ))
                        ))
                ))
                )
            )
        );
    }

    private getCountryByTld(tld: string): Observable<Country | null> {
        return this.countryApi.get({tld}).pipe(
            map(res => res.count === 0 ? null : res.results.shift())
        );
    }

    private getCity(name: string, country?: Country): Observable<City | null> {
        return this.cityApi.get({by_name: name, country: country.id.toString()}).pipe(
            map(res => res.count === 0 ? null : res.results.shift())
        );
    }

    private getPostal(postal: string, country?: Country, city?: City): Observable<PostalCode | null> {
        return this.postalApi.get({search: postal, country: country.id.toString(), city: city.id.toString()}).pipe(
            map(res => res.count === 0 ? null : res.results.shift())
        );
    }

    private getNominatimReverse(coords: Coords): Observable<NominatimReverseResponseInterface> {
        return this.nominatim.reverse(coords);
    }
}
