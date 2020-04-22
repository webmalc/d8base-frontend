import {Injectable} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {UserSettings} from '@app/core/models/user-settings';
import {ApiClientService} from '@app/core/services/api-client.service';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserSettingsApiService {

    private readonly url = environment.backend.user_settings;

    constructor(private client: ApiClientService) {
    }

    public get(): Observable<ApiListResponseInterface<UserSettings>> {
        return this.client.get(this.url).pipe(
            map((response: ApiListResponseInterface<UserSettings>) => {
                response.results = plainToClass(UserSettings, response.results);

                return response;
            })
        );
    }

    public save(userSettings: UserSettings): Observable<UserSettings> {
        return this.client.post(this.url, userSettings).pipe(
            map((response: UserSettings) => plainToClass(UserSettings, response))
        );
    }

    public update(userSettings: UserSettings): Observable<UserSettings> {
        return this.client.put(`${this.url}${userSettings.id}/`, userSettings).pipe(
            map((response: UserSettings) => plainToClass(UserSettings, response))
        );
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
}
