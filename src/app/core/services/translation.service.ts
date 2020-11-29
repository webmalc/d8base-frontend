import {Injectable} from '@angular/core';
import {once} from '@app/core/decorators/once';
import {UserSettings} from '@app/core/models/user-settings';
import {StorageManagerService} from '@app/core/proxies/storage-manager.service';
import {AuthenticationFactory} from '@app/core/services/authentication-factory.service';
import {UserSettingsService} from '@app/shared/services/user-settings.service';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TranslationService {

    public static readonly DIR = './assets/i18n/';
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
            isAuthenticated => {
                if (isAuthenticated) {
                    this.getFromApi().subscribe(
                        (lang: string) => {
                            if (lang) {
                                this.translator.use(lang);
                                this.setStorage(lang);
                            } else {
                                this.initFromStorage();
                            }
                        },
                        () => this.initFromStorage()
                    );
                } else {
                    this.initFromStorage();
                }
            }
        );
    }

    public setLang(lang: string): void {
        this.translator.use(lang);
        this.setStorage(lang);
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

    private initFromStorage(): void {
        this.getStorage().then(
            (lang: string | null) => {
                if (lang) {
                    this.translator.use(lang);
                } else {
                    this.translator.use(this.LANGUAGES.en);
                    this.setStorage(this.LANGUAGES.en);
                }
            }
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
