import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {PluginsFormFields} from '@app/profile/enums/plugins-form-fields';
import {PluginsFormService} from '@app/profile/forms/plugins-form.service';
import {Plugin} from '@app/profile/models/plugin';
import {UserPlugin} from '@app/profile/models/user-plugin';
import {PluginApiService} from '@app/profile/services/plugin-api.service';
import {UserPluginApiService} from '@app/profile/services/user-plugin-api.service';
import {User} from '@app/core/models/user';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-plugins-tab',
    templateUrl: './plugins-tab.component.html',
    styleUrls: ['./plugins-tab.component.scss'],
})
export class PluginsTabComponent implements OnInit {

    public form: FormGroup;
    public plugins: Plugin[];
    public readonly formFields = PluginsFormFields;

    constructor(
        private formBuilder: FormBuilder,
        private apiPlugins: PluginApiService,
        private apiUserPlugins: UserPluginApiService,
        private userManager: UserManagerService,
        private formService: PluginsFormService
    ) {
    }

    public ngOnInit(): void {
        this.formService.createForm().subscribe(
            form => this.form = form
        );
        this.apiPlugins.getPlugins().subscribe(
            (plugins: Plugin[]) => {
                this.plugins = this.sortPlugins(plugins);
            }
        );
    }

    public submitPlugins(): void {
        this.generateUserPlugins(this.form.getRawValue()[PluginsFormFields.Plugins]).subscribe(
            userPlugins => {
                this.apiUserPlugins.savePlugin(userPlugins);
            }
        );
    }

    public isSubmitDisabled(): boolean {
        return !(this.form.dirty && this.form.valid);
    }

    private generateUserPlugins(pluginsId: string[]): Observable<UserPlugin | UserPlugin[]> {
        return this.userManager.getCurrentUser().pipe(
            switchMap(
                (user: User) => {
                    const userPlugins: UserPlugin[] = [];
                    pluginsId.forEach(
                        pluginId => {
                            const newUserPlugin = new UserPlugin();
                            newUserPlugin.user_id = user.id;
                            newUserPlugin.plugin_id = parseInt(pluginId, 10);
                            userPlugins.push(newUserPlugin);
                        }
                    );

                    return of(userPlugins);
                }
            )
        );
    }

    private sortPlugins(plugins: Plugin[]): Plugin[] {
        plugins.sort((a: Plugin, b: Plugin) => {
            return a.id < b.id ? -1 : 1;
        });

        return plugins;
    }
}
