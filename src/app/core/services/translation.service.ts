import {Injectable} from '@angular/core';
import {once} from '@app/core/decorators/once';
import {UserSettings} from '@app/core/models/user-settings';
import {StorageManagerService} from '@app/core/proxies/storage-manager.service';
import {AuthenticationFactory} from '@app/core/services/authentication-factory.service';
import {UserSettingsService} from '@app/shared/services/user-settings.service';
import {TranslateService} from '@ngx-translate/core';
import {EMPTY, Observable} from 'rxjs';
import {filter, first, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TranslationService {

    public static readonly DIR = './assets/i18n/';
    public static readonly SUFFIX = '.json';
    public readonly LANGUAGES = {
        ru: 'ru',
        en: 'en'
    };
    private readonly STORAGE_KEY = 'lang';

    constructor(
        private readonly translator: TranslateService,
        private readonly storageManager: StorageManagerService,
        private readonly userSettings: UserSettingsService,
        private readonly authenticationFactory: AuthenticationFactory
    ) {
    }

    @once
    public init(): void {
        this.authenticationFactory.getAuthenticator().isAuthenticated$.pipe(first()).subscribe(
            isAuthenticated => isAuthenticated ?
                this.getFromApi().subscribe(
                    (lang: string) => null !== lang ? this.setLang(lang) : this.initFromStorage(),
                    _ => this.initFromStorage()
                ) :
                this.initFromStorage(),
            _ => EMPTY,
            () => this.subToUserSettings()
        );
    }

    public setLang(lang: string): void {
        this.translator.setDefaultLang(lang);
        this.setStorage(lang);
    }

    public trans(key?: string): Observable<string | any> {
        return this.translator.get(key);
    }

    public getCurrentLang(): string {
        return this.translator.getDefaultLang();
    }

    public getLanguagesAsArray(): Array<string> {
        return Object.values(this.LANGUAGES);
    }

    private subToUserSettings(): void {
        this.userSettings.userSettings$.pipe(filter(data => data.language && true)).subscribe(
            data => this.setLang(data.language)
        );
    }

    private initFromStorage(): void {
        this.getStorage().then(
            (defaultLang: string | null) => null !== defaultLang ?
                this.translator.setDefaultLang(defaultLang) :
                this.setLang(this.LANGUAGES.en)
        );
    }

    private getFromApi(): Observable<string | null> {
        return this.userSettings.userSettings$.pipe(
            first(),
            map((data: UserSettings) => data?.language as string)
        );
    }

    private setStorage(lang: string): void {
        this.storageManager.set(this.STORAGE_KEY, lang);
    }

    private getStorage(): Promise<string> {
        return this.storageManager.get(this.STORAGE_KEY);
    }
}
