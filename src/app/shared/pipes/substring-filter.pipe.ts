import { Pipe, PipeTransform } from '@angular/core';
import { normalizeString } from '@app/core/functions/string.functions';

function searchByField(field: string): (substr) => (item) => boolean {
  return substr => {
    const normalizedSubstr = normalizeString(substr);
    return item => normalizeString(item[field].toString()).includes(normalizedSubstr);
  };
}

@Pipe({
  name: 'substringFilter',
  pure: false,
})
export class SubstringFilterPipe implements PipeTransform {
  public transform<T>(items: T[], field: string, substr: string): T[] {
    if (!items || !substr) {
      return items;
    }
    const filter = searchByField(field)(substr);
    return items.filter(item => filter(item));
  }
}
