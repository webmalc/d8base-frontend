import {Injectable} from '@angular/core';
import {AbstractApiService} from '@app/core/abstract/abstract-api.service';
import {ApiServiceInterface} from '@app/core/interfaces/api-service-interface';
import {UserSettings} from '@app/core/models/user-settings';
import {ApiClientService} from '@app/core/services/api-client.service';
import {environment} from '@env/environment';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserSettingsApiService extends AbstractApiService<UserSettings> implements ApiServiceInterface<UserSettings> {

    private readonly url = environment.backend.user_settings;

    constructor(protected client: ApiClientService) {
        super(client);
    }

    public getOptions(): Observable<{
        actions: {
            POST: {
                language: { choices: Array<{ value: string, display_name: string }> },
                currency: { choices: Array<{ value: string, display_name: string }> }
            }
        }
    }> {
        return this.client.options(this.url);
    }

    protected getUrl(): string {
        return this.url;
    }

    // @ts-ignore
    protected transform(data: UserSettings | UserSettings[]): UserSettings | UserSettings[] {
        return plainToClass(UserSettings, data);
    }
}
