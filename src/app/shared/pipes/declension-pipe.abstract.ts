import { TranslateService } from '@ngx-translate/core';
import { PipeTransform } from '@angular/core';
import { declination } from '@app/core/functions/string.functions';

export abstract class DeclensionPipe implements PipeTransform {
  protected constructor(private readonly translateService: TranslateService) {}

  protected abstract declensions: string[];

  public transform(count: number): string {
    return !count ? '' : `${count} ${this.translateService.instant(declination(count, this.declensions))}`;
  }
}
