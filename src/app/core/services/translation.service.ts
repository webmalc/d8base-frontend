import { Injectable } from '@angular/core';
import { UserSettingsService } from '@app/shared/services/user-settings.service';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {

  public static readonly DIR = './assets/i18n/';
  public readonly LANGUAGES = {
    ru: 'ru',
    en: 'en',
  };
  public readonly currentLanguage$: Observable<string>;

  constructor(
    private readonly translator: TranslateService,
    private readonly userSettings: UserSettingsService,
  ) {
    this.subOnUserSettings();
    this.currentLanguage$ = translator.onLangChange.pipe(
      map(x => x.lang),
      startWith(environment.default_lang),
      shareReplay(1),
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

  private subOnUserSettings() {
    this.userSettings.userSettings$.pipe(
      map(settings => settings.language),
    ).subscribe(language => this.setLang(language));
  }
}
