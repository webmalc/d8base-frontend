import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { UserLanguage } from '@app/api/models';
import { LanguagesApiCache, UserLanguagesApiCache } from '@app/core/services/cache';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent {
  public languageName;

  @Input()
  public inline: boolean;

  constructor(
    private readonly userLanguagesApiCache: UserLanguagesApiCache,
    private readonly languagesApiCache: LanguagesApiCache,
    private readonly changeDetector: ChangeDetectorRef,
  ) {}

  @Input()
  public set language(value: UserLanguage) {
    this.languagesApiCache.getByEntityId(value.language).subscribe(language => {
      this.languageName = language.name;
      this.changeDetector.markForCheck();
    });
  }

  @Input()
  public set languageId(id: number) {
    this.userLanguagesApiCache.getByEntityId(id).subscribe(language => (this.language = language));
  }
}
