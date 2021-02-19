import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable()
export abstract class ApiCache<T> implements OnDestroy {
  private readonly cache = new Map<number, Observable<T>>();

  public ngOnDestroy(): void {
    this.cache.clear();
  }

  public getByEntityId(id: number): Observable<T> {
    if (!this.cache.has(id)) {
      this.cache.set(id, this.read(id).pipe(shareReplay(1)));
    }

    return this.cache.get(id);
  }

  protected abstract read(id: number): Observable<T>;
}
