import {Injectable} from '@angular/core';
import {ApiClientService} from '@app/core/services/api-client.service';
import {Plugin} from '@app/profile/models/plugin';
import {plainToClass} from 'class-transformer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable()
export class PluginApiService {

    private readonly URL = environment.backend.plugin;

    constructor(private client: ApiClientService) {
    }

    public getPlugin(pluginId: number): Observable<Plugin> {
        return this.client.get(`${this.URL}/${pluginId}`).pipe(
            map(raw => plainToClass(Plugin, raw))
        );
    }

    public getPlugins(): Observable<Plugin[]> {
        return this.client.get<Plugin[]>(this.URL).pipe(
            map(raw => plainToClass(Plugin, raw))
        );
    }

    public savePlugin(plugin: Plugin | Plugin[]): Observable<Plugin | Plugin[]> {
        return this.client.post(this.URL, plugin);
    }
}
