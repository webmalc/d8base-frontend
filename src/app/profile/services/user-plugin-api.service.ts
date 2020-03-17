import {Injectable} from '@angular/core';
import {ApiClientService} from '@app/core/services/api-client.service';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {UserPlugin} from '@app/profile/models/user-plugin';
import {User} from '@app/core/models/user';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable()
export class UserPluginApiService {

    private readonly URL = environment.backend.user_plugin;

    constructor(private client: ApiClientService, private userManager: UserManagerService) {
    }

    public getCurrentUserPlugins(): Observable<UserPlugin[]> {
        return this.userManager.getCurrentUser().pipe(
            switchMap((user: User) => this.getPlugins(user.id))
        );
    }

    public getPlugins(userId: number): Observable<UserPlugin[]> {
        return this.client.get<Array<UserPlugin>>(`${this.URL}/${userId}`).pipe(
            map(raw => plainToClass(UserPlugin, raw))
        );
    }

    public savePlugin(plugin: UserPlugin | UserPlugin[]): Observable<UserPlugin | UserPlugin[]> {
        return this.client.post<UserPlugin | UserPlugin[]>(this.URL, plugin).pipe(
            map(raw => plainToClass(UserPlugin, raw))
        );
    }
}
