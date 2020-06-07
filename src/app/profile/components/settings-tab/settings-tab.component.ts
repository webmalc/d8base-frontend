import {Component, OnInit} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {UserSettings} from '@app/core/models/user-settings';
import {TranslationService} from '@app/core/services/translation.service';
import {UserSettingsApiService} from '@app/core/services/user-settings-api.service';
import {UserSettingsFromFields} from '@app/profile/enums/user-settings-from-fields';
import {SettingsFormService} from '@app/profile/forms/settings-form.service';
import {plainToClass} from 'class-transformer';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-settings-tab',
    templateUrl: './settings-tab.component.html',
    styleUrls: ['./settings-tab.component.scss'],
})
export class SettingsTabComponent implements OnInit {

    public formFields = UserSettingsFromFields;
    private defaultUserSettings: UserSettings;

    constructor(
        public formService: SettingsFormService,
        private userSettingsApi: UserSettingsApiService,
        private translation: TranslationService
    ) {
    }

    public ngOnInit(): void {
        this.userSettingsApi.getOptions().subscribe(
            optionsData => {
                this.formService.setLists(optionsData.actions.POST.language.choices, optionsData.actions.POST.currency.choices);
                this.userSettingsApi.get().pipe(
                    tap((data: ApiListResponseInterface<UserSettings>) => this.defaultUserSettings = data.results[0])
                ).subscribe(
                    (data: ApiListResponseInterface<UserSettings>) => this.formService.createForm(data.results[0])
                );
            }
        );
    }

    public submitSettings(): void {
        if (this.defaultUserSettings) {
            this.defaultUserSettings.currency = this.formService.form.get(UserSettingsFromFields.Currency).value;
            this.defaultUserSettings.language = this.formService.form.get(UserSettingsFromFields.Language).value;
            this.userSettingsApi.put(this.defaultUserSettings).pipe(
                tap(res => this.translation.setLang(res.language as string))
            ).subscribe(
                res => this.defaultUserSettings = res
            );
        } else {
            this.userSettingsApi.create(plainToClass(UserSettings, this.formService.form.getRawValue())).pipe(
                tap(res => this.translation.setLang(res.language as string))
            ).subscribe(
                res => this.defaultUserSettings = res
            );
        }
    }
}
