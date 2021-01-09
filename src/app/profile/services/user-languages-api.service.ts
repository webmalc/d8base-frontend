import {Injectable} from '@angular/core';
import {AbstractApiService} from '@app/core/abstract/abstract-api.service';
import {ApiClientService} from '@app/core/services/api-client.service';
import {UserLanguage} from '@app/profile/models/user-language';
import {environment} from '@env/environment';
import {plainToClass} from 'class-transformer';

@Injectable({
    providedIn: 'root',
})
export class UserLanguagesApiService extends AbstractApiService<UserLanguage> {

    private readonly url = environment.backend.user_language;

    constructor(protected client: ApiClientService) {
        super(client);
    }

    protected getUrl(): string {
        return this.url;
    }

    // @ts-ignore
    protected transform(data: UserLanguage | UserLanguage[]): UserLanguage | UserLanguage[] {
        return plainToClass(UserLanguage, data);
    }
}
