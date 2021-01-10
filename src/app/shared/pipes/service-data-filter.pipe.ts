import { Pipe, PipeTransform } from '@angular/core';
import ServiceData from '@app/core/interfaces/service-data.interface';

@Pipe({
  name: 'serviceDataFilter',
  pure: false,
})
export class ServiceDataFilterPipe implements PipeTransform {
  public transform(value: ServiceData[], term: string): ServiceData[] {
    if (!term) {
      return value;
    }
    const regExp = new RegExp(term, 'gi');

    return (value || []).filter(serviceData => regExp.test(serviceData.service.name));
  }
}
