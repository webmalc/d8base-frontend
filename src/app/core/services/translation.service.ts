import {Injectable} from '@angular/core';
import {once} from '@app/core/decorators/once';
import {UserSettings} from '@app/core/models/user-settings';
import {UserSettingsService} from '@app/shared/services/user-settings.service';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class TranslationService {

    public static readonly DIR = './assets/i18n/';
    public readonly LANGUAGES = {
        ru: 'ru',
        en: 'en',
    };

    constructor(
        private readonly translator: TranslateService,
        private readonly userSettings: UserSettingsService,
    ) {
    }

    @once
    public init(): void {
        this.getSettings().subscribe(
            lang => this.setLang(lang),
        );
    }

    public setLang(lang: string): void {
        this.translator.use(lang);
    }

    public trans(key?: string): Observable<string | any> {
        return this.translator.get(key);
    }

    public getCurrentLang(): string {
        return this.translator.currentLang;
    }

    public getLanguagesAsArray(): Array<string> {
        return Object.values(this.LANGUAGES);
    }

    private getSettings(): Observable<string | null> {
        return this.userSettings.userSettings$.pipe(
            map((data: UserSettings) => data?.language as string),
        );
    }
}
