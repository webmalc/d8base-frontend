import { Pipe } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DeclensionPipe } from './declension-pipe.abstract';

@Pipe({
  name: 'asReviews',
  pure: false,
})
export class AsReviewsPipe extends DeclensionPipe {
  protected declensions = ['declination.reviews.1', 'declination.reviews.2', 'declination.reviews.3'];
  constructor(translateService: TranslateService) {
    super(translateService);
  }
}
