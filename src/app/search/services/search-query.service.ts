import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '@app/api/services';
import { SearchFilterStateConverter } from '@app/search/services/search-filter-state-converter.service';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { SearchFilterStateInterface } from '../interfaces/search-filter-state-interface';

const DEBOUNCE_DURATION_MS = 200;

@Injectable({ providedIn: 'root' })
export class SearchQueryService {
  private readonly params$ = new BehaviorSubject<SearchService.SearchListParams | null>(null);

  constructor(
    private readonly searchFilterStateConverter: SearchFilterStateConverter,
    private readonly router: Router,
  ) {
    this.params$
      .pipe(
        filter(x => !!x),
        debounceTime(DEBOUNCE_DURATION_MS),
      )
      .subscribe(queryParams => {
        this.router.navigate(['/search'], { queryParams });
      });
  }

  public searchByFormValue(formValue: SearchFilterStateInterface): void {
    const params = this.searchFilterStateConverter.getSearchListParams(formValue);
    this.setSearchParams(params);
  }

  public deleteSearchParam(key: string) {
    const newParams = {
      ...this.params$.value,
    };
    newParams[key] = null;
    this.setSearchParams(newParams);
  }

  private setSearchParams(params: SearchService.SearchListParams): void {
    return this.params$.next(params);
  }
}
