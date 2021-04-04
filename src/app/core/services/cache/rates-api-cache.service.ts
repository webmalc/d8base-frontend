import { Injectable } from '@angular/core';
import { Rate } from '@app/api/models';
import { RatesService } from '@app/api/services';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RatesApiCache {
  private readonly cache = new Map<number, Observable<Rate>>();
  private readonly listCache: Observable<Rate[]>;

  constructor(private readonly ratesService: RatesService) {
    this.listCache = this.ratesService.ratesList({}).pipe(shareReplay(1));
  }

  public list(): Observable<Rate[]> {
    return this.listCache;
  }

  public getByEntityId(id: number): Observable<Rate> {
    if (!this.cache.has(id)) {
      this.cache.set(id, this.read(id).pipe(shareReplay(1)));
    }

    return this.cache.get(id);
  }

  private read(id: number): Observable<Rate> {
    return this.ratesService.ratesRead(id);
  }
}
