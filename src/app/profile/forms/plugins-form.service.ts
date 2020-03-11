import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserPlugin} from '@app/profile/models/user-plugin';
import {UserPluginApiService} from '@app/profile/services/user-plugin-api.service';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import { PluginsFormFields } from '../enums/plugins-form-fields';

@Injectable()
export class PluginsFormService {

    constructor(
        private formBuilder: FormBuilder,
        private apiUserPlugins: UserPluginApiService
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
        return this.apiUserPlugins.getCurrentUserPlugins().pipe(
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
}
