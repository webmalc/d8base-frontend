import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LocaleService {
  constructor(private readonly translateService: TranslateService) {}

  public get locale(): string {
    return this.translateService.currentLang === 'ru' ? 'ru-RU' : 'en-CA';
  }
}
