import { Pipe, PipeTransform } from '@angular/core';
import { declination } from '@app/core/functions/string.functions';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'asYears',
  pure: false,
})
export class AsYearsPipe implements PipeTransform {
  constructor(private readonly translateService: TranslateService) {}

  public transform(yearsCount: number): string {
    return !yearsCount
      ? ''
      : `${yearsCount} ${this.translateService.instant(
          declination(yearsCount, ['declination.years.1', 'declination.years.2', 'declination.years.3']),
        )}`;
  }
}
