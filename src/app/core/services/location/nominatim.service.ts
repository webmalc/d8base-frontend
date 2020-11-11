import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {NominatimReverseResponseInterface} from '@app/core/interfaces/nominatim-reverse-response-interface';
import {TranslationService} from '@app/core/services/translation.service';
import {Coords} from '@app/shared/interfaces/coords';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NominatimService {

    constructor(private readonly http: HttpClient, private readonly trans: TranslationService) {
    }

    public reverse(coords: Coords, lang?: string): Observable<NominatimReverseResponseInterface> {
        const responseLang = lang ? lang : this.trans.getCurrentLang();
        // coords.longitude = 6.206910610198975;
        // coords.latitude = 49.934700793362964;

        return this.http.get<NominatimReverseResponseInterface>(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.latitude}&lon=${coords.longitude}`,
            {headers: {'accept-language': responseLang}}
        );
    }
}
