import { Pipe, PipeTransform } from '@angular/core';
import { ServiceList } from '@app/api/models';

@Pipe({
  name: 'serviceDataFilter',
  pure: false,
})
export class ServiceDataFilterPipe implements PipeTransform {
  public transform(value: ServiceList[], term: string): ServiceList[] {
    if (!term) {
      return value;
    }
    const regExp = new RegExp(term, 'gi');

    return (value || []).filter(serviceList => regExp.test(serviceList.name));
  }
}
