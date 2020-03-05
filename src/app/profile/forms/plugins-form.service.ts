import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {UserPlugin} from '@app/profile/models/user-plugin';
import {UserPluginApiService} from '@app/profile/services/user-plugin-api.service';
import {User} from '@app/shared/models/user';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import { PluginsFormFields } from '../enums/plugins-form-fields';

@Injectable()
export class PluginsFormService {

    constructor(
        private formBuilder: FormBuilder,
        private apiUserPlugins: UserPluginApiService,
        private userManager: UserManagerService
    ) {
    }

    public createForm(): Observable<FormGroup> {
        return this.getPluginsIdArray().pipe(
            switchMap(
                (pluginsId: string[]) => {
                    const form = this.formBuilder.group({
                        [PluginsFormFields.Plugins]: [pluginsId]
                    });

                    return of(form);
                }
            )
        );
    }

    private getPluginsIdArray(): Observable<string[]> {
        return this.getUserPlugins().pipe(
            switchMap(
                (plugins: UserPlugin[]) => {
                    const ids: string[] = [];
                    plugins.forEach(
                        (plugin: UserPlugin) => {
                            ids.push(plugin.plugin_id.toString(10));
                        }
                    );

                    return of(ids);
                }
            )
        );
    }

    private getUserPlugins(): Observable<UserPlugin[]> {
        return this.userManager.getCurrentUser().pipe(
            switchMap(
                (user: User) => {
                    return this.apiUserPlugins.getPlugins(user);
                }
            )
        );
    }
}
