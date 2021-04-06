import { Injectable } from '@angular/core';
import { Country } from '@app/api/models';
import { LocationService } from '@app/api/services';
import { ApiCache } from '@app/core/abstract/api-cache.service';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

const PAGE_SIZE = 250;

@Injectable({
  providedIn: 'root',
})
export class CountriesApiCache extends ApiCache<Country> {
  private readonly listCache: Observable<Country[]>;
  constructor(private readonly locationService: LocationService) {
    super();
    this.listCache = this.locationService.locationCountriesList({ pageSize: PAGE_SIZE }).pipe(
      map(({ results }) => results),
      shareReplay(1),
    );
  }

  public list(): Observable<Country[]> {
    return this.listCache;
  }

  protected read(id): Observable<Country> {
    return this.locationService.locationCountriesRead(id);
  }
}
