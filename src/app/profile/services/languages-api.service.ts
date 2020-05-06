import {Injectable} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {Language} from '@app/profile/models/language';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LanguagesApiService {

    private readonly url = environment.backend.language;

    constructor(private client: ApiClientService) {
    }

    public getLanguages(): Observable<Language[]> {
        return this.client.get<ApiListResponseInterface<Language>>(this.url).pipe(
            map(
                ({results}) => {
                    return plainToClass<Language, object>(Language, results, {excludeExtraneousValues: true});
                }
            )
        );
    }
}
