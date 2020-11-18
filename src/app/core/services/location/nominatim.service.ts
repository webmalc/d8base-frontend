import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ErrorList} from '@app/core/enums/error-list';
import {NominatimReverseResponseInterface} from '@app/core/interfaces/nominatim-reverse-response-interface';
import {NominatimSearchResponseInterface} from '@app/core/interfaces/nominatim-search-response-interface';
import {NominatimReverseResponse} from '@app/core/models/nominatim-reverse-response';
import {PostalCode} from '@app/core/models/postal-code';
import {TranslationService} from '@app/core/services/translation.service';
import {City} from '@app/profile/models/city';
import {Country} from '@app/profile/models/country';
import {Coords} from '@app/shared/interfaces/coords';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NominatimService {

    private readonly REVERSE_URL = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2';
    private readonly SEARCH_URL = 'https://nominatim.openstreetmap.org/search?format=jsonv2';

    constructor(private readonly http: HttpClient, private readonly trans: TranslationService) {
    }

    public reverse(coords: Coords, lang?: string): Observable<NominatimReverseResponse | null> {
        const responseLang = lang ? lang : this.trans.getCurrentLang();

        return this.http.get<NominatimReverseResponseInterface | null>(
            `${this.REVERSE_URL}&lat=${coords.latitude}&lon=${coords.longitude}`,
            {headers: {'accept-language': responseLang}}
        ).pipe(
            map(r => r.error === ErrorList.NOMINATIM_CANNOT_REVERSE_ERROR ? null : plainToClass(NominatimReverseResponse, r))
        );
    }

    public search(county: Country, city?: City, postal?: PostalCode): Observable<Coords | null> {
        const cityQuery = (!city || !city.name) ? '' : `&city=${city.name}`;
        const postalQuery = (!postal || !postal.code) ? '' : `&city=${postal.code}`;

        return this.http.get<NominatimSearchResponseInterface[] | null>(
            `${this.SEARCH_URL}&country=${county.name}${cityQuery}${postalQuery}`
        ).pipe(
            map(r => r.length === 0 ? null : {latitude: parseFloat(r[0].lat), longitude: parseFloat(r[0].lon)}
            )
        );
    }
}
