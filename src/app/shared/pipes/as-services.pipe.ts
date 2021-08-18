import { Pipe } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DeclensionPipe } from './declension-pipe.abstract';

@Pipe({
  name: 'asServices',
  pure: false,
})
export class AsServicesPipe extends DeclensionPipe {
  protected declensions = ['declination.services.1', 'declination.services.2', 'declination.services.3'];
  constructor(translateService: TranslateService) {
    super(translateService);
  }
}
