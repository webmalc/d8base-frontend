import { Injectable } from '@angular/core';
import { UserSettingsService } from '@app/core/services/facades/user-settings.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TranslationService {
  constructor(private readonly translator: TranslateService, private readonly userSettings: UserSettingsService) {
    this.subOnUserSettings();
  }

  public setLang(lang: string): void {
    this.translator.use(lang);
  }

  public trans(key?: string): Observable<string | any> {
    return this.translator.get(key);
  }

  private subOnUserSettings(): void {
    this.userSettings.userSettings$
      .pipe(map(settings => settings.language))
      .subscribe(language => this.setLang(language));
  }
}
