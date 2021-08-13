import { Pipe, PipeTransform } from '@angular/core';

const DEFAULT_SEPARATOR = ', ';

@Pipe({
  name: 'asString',
  pure: true,
})
export class AsStringPipe implements PipeTransform {
  public transform(list: any[]): string {
    return list.join(DEFAULT_SEPARATOR);
  }
}
