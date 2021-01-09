import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorList } from '@app/core/enums/error-list';
import { NominatimReverseResponseInterface } from '@app/core/interfaces/nominatim-reverse-response-interface';
import { NominatimSearchResponseInterface } from '@app/core/interfaces/nominatim-search-response-interface';
import { NominatimReverseResponse } from '@app/core/models/nominatim-reverse-response';
import { PostalCode } from '@app/core/models/postal-code';
import { HelperService } from '@app/core/services/helper.service';
import { City } from '@app/profile/models/city';
import { Country } from '@app/profile/models/country';
import { Coords } from '@app/shared/interfaces/coords';
import { environment } from '@env/environment';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class NominatimService {

    private readonly REVERSE_URL = environment.nominatim_reverse_url;
    private readonly SEARCH_URL = environment.nominatim_search_url;

    constructor(private readonly http: HttpClient) {
    }

    public reverse(coords: Coords): Observable<NominatimReverseResponse | null> {
        return this.http.get<NominatimReverseResponseInterface | null>(
            this.REVERSE_URL,
            {
                headers: { 'accept-language': 'en'},
                params: { lat: coords.latitude.toString(), lon: coords.longitude.toString(), format: 'jsonv2'},
            },
        ).pipe(
            map(r => r.error === ErrorList.NOMINATIM_CANNOT_REVERSE_ERROR ? null : plainToClass(NominatimReverseResponse, r)),
        );
    }

    public search(county: Country, city?: City, postal?: PostalCode): Observable<Coords | null> {
        return this.http.get<NominatimSearchResponseInterface[] | null>(
            this.SEARCH_URL,
            { params: HelperService.clear({ country: county?.name, city: city?.name, postalcode: postal?.code, format: 'jsonv2'})},
        ).pipe(
            map(r => r.length === 0 ? null : { latitude: parseFloat(r[0].lat), longitude: parseFloat(r[0].lon)},
            ),
        );
    }
}
