import {Injectable} from '@angular/core';
import {ApiClientService} from '@app/core/services/api-client.service';
import {UserPlugin} from '@app/profile/models/user-plugin';
import {User} from '@app/shared/models/user';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable()
export class UserPluginApiService {

    private readonly URL = environment.backend.user_plugin;

    constructor(private client: ApiClientService) {
    }

    public getPlugins(user: User): Observable<UserPlugin[]> {
        return this.client.get<Array<UserPlugin>>(`${this.URL}/${user.id}`).pipe(
            map(raw => plainToClass(UserPlugin, raw))
        );
    }

    public savePlugin(plugin: UserPlugin | UserPlugin[]): Observable<UserPlugin> {
        return this.client.post<UserPlugin>(this.URL, plugin);
    }
}
