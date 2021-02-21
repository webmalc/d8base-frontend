import { Injectable } from '@angular/core';
import { Language } from '@app/api/models';
import { LocationService } from '@app/api/services';
import { ApiCache } from '@app/core/abstract/api-cache.service';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LanguagesApiCache extends ApiCache<Language> {
  private readonly listCache: Observable<Language[]>;
  constructor(private readonly locationService: LocationService) {
    super();
    this.listCache = this.locationService.locationLanguagesList().pipe(shareReplay(1));
  }

  public list(): Observable<Language[]> {
    return this.listCache;
  }

  protected read(id): Observable<Language> {
    return this.locationService.locationLanguagesRead(id);
  }

}
