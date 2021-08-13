import { Pipe, PipeTransform } from '@angular/core';
import { declination } from '@app/core/functions/string.functions';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'asReviews',
  pure: false,
})
export class AsReviewsPipe implements PipeTransform {
  constructor(private readonly translateService: TranslateService) {}

  public transform(reviewsCount: number): string {
    return !reviewsCount
      ? ''
      : `${reviewsCount} ${this.translateService.instant(
          declination(reviewsCount, ['declination.reviews.1', 'declination.reviews.2', 'declination.reviews.3']),
        )}`;
  }
}
