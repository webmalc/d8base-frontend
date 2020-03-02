import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ApiClientService} from '@app/core/services/api-client.service';
import {environment} from '../../../../environments/environment';
import {plainToClass} from 'class-transformer';
import {Plugin} from '@app/profile/models/plugin';
import {switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Component({
    selector: 'app-plugins-tab',
    templateUrl: './plugins-tab.component.html',
    styleUrls: ['./plugins-tab.component.scss'],
})
export class PluginsTabComponent implements OnInit {

    public form: FormGroup;
    public plugins: Array<Plugin>;
    private pluginCount: number = 1;

    constructor(private formBuilder: FormBuilder, private api: ApiClientService) {
        this.getPlugins().subscribe(
            (plugins: Array<Plugin>) => {
                this.plugins = plugins;
            }
        );
        this.form = formBuilder.group({
            plugins: formBuilder.array([])
        });
    }

    ngOnInit() {
    }

    public removeSelect(index: number): void {
        (this.form.get('plugins') as FormArray).removeAt(index);
    }

    public submitPlugins(): void {
        console.log(this.form.getRawValue());
    }

    public add(): void {
        this.pluginCount += 1;
        (this.form.get('plugins') as FormArray).push(new FormControl(this.pluginCount));
    }

    public getPlugins(): Observable<Array<Plugin>> {
        return this.api.get<object[]>(environment.backend.plugin).pipe(
            switchMap(
                plugins => {
                    console.log(plainToClass(Plugin, plugins));

                    return of(plainToClass(Plugin, plugins));
                }
            )
        );
    }
}
