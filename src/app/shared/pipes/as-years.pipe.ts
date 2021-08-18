import { Pipe } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DeclensionPipe } from './declension-pipe.abstract';

@Pipe({
  name: 'asYears',
  pure: false,
})
export class AsYearsPipe extends DeclensionPipe {
  protected declensions = ['declination.years.1', 'declination.years.2', 'declination.years.3'];
  constructor(translateService: TranslateService) {
    super(translateService);
  }
}
