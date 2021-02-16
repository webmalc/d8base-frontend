import { Injectable } from '@angular/core';
import { UserSettingsService } from '@app/shared/services/user-settings.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { distinct, map } from 'rxjs/operators';

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
    this.subOnUserSettings();
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
      distinct(),
    ).subscribe(language => this.setLang(language));
  }
}
