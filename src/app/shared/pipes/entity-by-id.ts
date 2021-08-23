import { PipeTransform } from '@angular/core';
import { ApiCache } from '@app/core/services/cache/api-cache.service';
import { Observable, of } from 'rxjs';

export abstract class EntityById<T> implements PipeTransform {
  protected entityCache: ApiCache<T>;

  public transform(id: number): Observable<T> {
    if (!id) {
      return of<T>(null);
    }

    return this.entityCache.getByEntityId(id);
  }
}
