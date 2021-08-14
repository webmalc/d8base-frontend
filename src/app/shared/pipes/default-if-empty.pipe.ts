import { Pipe, PipeTransform } from '@angular/core';
import { getNoAvatarLink } from '@app/core/functions/media.functions';

@Pipe({
  name: 'defaultIfEmpty',
  pure: true,
})
export class DefaultIfEmptyPipe implements PipeTransform {
  public transform(value?: string): string {
    return value || getNoAvatarLink();
  }
}
