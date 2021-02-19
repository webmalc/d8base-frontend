import { Pipe, PipeTransform } from '@angular/core';
import { ServicesApiCache } from '@app/core/services/cache';
import { Service } from '@app/api/models';
import { Observable, of } from 'rxjs';

@Pipe({
  name: 'serviceById$',
})
export class ServiceByIdPipe implements PipeTransform {

  constructor(
    private readonly serviceCache: ServicesApiCache,
  ) {
  }

  public transform(id: number): Observable<Service> {
    if (!id) {
      return of<Service>(null);
    }

    return this.serviceCache.getByEntityId(id);
  }
}
