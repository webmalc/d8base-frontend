import {Injectable} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {UserSettings} from '@app/core/models/user-settings';
import {StorageManagerService} from '@app/core/proxies/storage-manager.service';
import {UserSettingsApiService} from '@app/core/services/user-settings-api.service';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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
        private translator: TranslateService,
        private storageManager: StorageManagerService,
        private userSettingsApi: UserSettingsApiService
    ) {
    }

    public init(): void {
        this.getFromApi().subscribe(
            (lang: string) => {
                if (lang) {
                    this.translator.setDefaultLang(lang);
                    this.setStorage(lang);
                } else {
                    this.initFromStorage();
                }
            },
            err => this.initFromStorage()
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

    private initFromStorage(): void {
        this.getStorage().then(
            (defaultLang: string | null) => {
                if (defaultLang !== null) {
                    this.translator.setDefaultLang(defaultLang);
                } else {
                    this.translator.setDefaultLang(this.LANGUAGES.en);
                    this.setStorage(this.LANGUAGES.en);
                }
            }
        );
    }

    private getFromApi(): Observable<string> {
        return this.userSettingsApi.get().pipe(
            map((data: ApiListResponseInterface<UserSettings>) => data.results[0].language as string)
        );
    }

    private setStorage(lang: string): void {
        this.storageManager.set(this.STORAGE_KEY, lang);
    }

    private getStorage(): Promise<string> {
        return this.storageManager.get(this.STORAGE_KEY);
    }
}
