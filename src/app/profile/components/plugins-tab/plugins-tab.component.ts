import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Plugin} from '@app/profile/models/plugin';
import {PluginApiService} from '@app/profile/services/plugin-api.service';
import {Observable} from 'rxjs';
import {plainToClass} from 'class-transformer';
import {UserPluginApiService} from '@app/profile/services/user-plugin-api.service';
import {AuthenticationFactory} from '@app/core/services/authentication-factory.service';

@Component({
    selector: 'app-plugins-tab',
    templateUrl: './plugins-tab.component.html',
    styleUrls: ['./plugins-tab.component.scss'],
})
export class PluginsTabComponent implements OnInit {

    public form: FormGroup;
    public plugins: Plugin[];

    constructor(
        private formBuilder: FormBuilder,
        private apiPlugins: PluginApiService,
        private apiUserPlugins: UserPluginApiService,
        private authFactory: AuthenticationFactory
    ) {
    }

    public ngOnInit(): void {
        this.form = this.formBuilder.group({
            Plugins: ['', Validators.required]
        });
        this.getPlugins().subscribe(
            (plugins: Plugin[]) => {
                this.plugins = this.sortPlugins(plugins);
            }
        );
    }

    public submitPlugins(): void {
        this.apiPlugins.savePlugin(this.getSelectedPlugins(this.form.getRawValue().Plugins));
    }

    private getSelectedPlugins(selectedIds: string[]): Plugin[] {
        const plugins: Plugin[] = [];
        selectedIds.forEach(
            id => plugins.push(this.plugins[parseInt(id, 10)])
        );

        return plugins;
    }

    private getPlugins(): Observable<Array<Plugin>> {
        return this.apiPlugins.getPlugins();
    }

    private sortPlugins(plugins: Plugin[]): Plugin[] {
        const res: Plugin[] = [];

        plugins.sort((a: Plugin, b: Plugin) => {
            return a.id < b.id ? -1 : 1;
        });

        plugins.forEach(
            (plugin: Plugin) => {
                res[plugin.id] = plugin;
            }
        );

        return res;
    }
}
