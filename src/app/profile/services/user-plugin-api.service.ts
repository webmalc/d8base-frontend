import {Injectable} from '@angular/core';
import {ApiClientService} from '@app/core/services/api-client.service';
import {UserPlugin} from '@app/profile/models/user-plugin';
import {User} from '@app/shared/models/user';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {AuthenticationFactory} from '@app/core/services/authentication-factory.service';

@Injectable()
export class UserPluginApiService {

    private readonly URL = environment.backend.user_plugin;

    constructor(private client: ApiClientService, private authFactory: AuthenticationFactory) {
    }

    // public getCurrentUserPlugins(): Observable<UserPlugin[]> {
    //     return this.authFactory.getAuthenticator().getUserId().pipe(
    //         switchMap(
    //             (userId: number) => {
    //                 return this.getPlugins(userId);
    //             }
    //         )
    //     );
    // }
    //
    // public setCurrentUserPlugins(plugin: UserPlugin | UserPlugin[]): Observable<UserPlugin[] | UserPlugin> {
    //     return this.authFactory.getAuthenticator().getUserId().pipe(
    //         switchMap(
    //             (userId: number) => {
    //                 return this.getPlugins(userId);
    //             }
    //         )
    //     );
    // }

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
