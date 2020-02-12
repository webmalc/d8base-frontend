import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';

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

    constructor(private translator: TranslateService) {
    }

    public init(): void {
        this.translator.setDefaultLang(this.LANGUAGES.en);

        return;
    }

    public setLang(lang: string): void {
        this.translator.setDefaultLang(lang);
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
}
