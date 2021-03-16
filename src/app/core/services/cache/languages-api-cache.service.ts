import { Injectable } from '@angular/core';
import { Language } from '@app/api/models';
import { LocationService } from '@app/api/services';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LanguagesApiCache {
  private readonly cache = new Map<string, Observable<Language>>();
  private readonly listCache: Observable<Language[]>;

  constructor(private readonly locationService: LocationService) {
    this.listCache = this.locationService.locationLanguagesList().pipe(shareReplay(1));
  }

  public list(): Observable<Language[]> {
    return this.listCache;
  }

  public getByEntityId(id: string): Observable<Language> {
    if (!this.cache.has(id)) {
      this.cache.set(id, this.read(id).pipe(shareReplay(1)));
    }

    return this.cache.get(id);
  }

  private read(id: string): Observable<Language> {
    return this.locationService.locationLanguagesRead(id);
  }

}
