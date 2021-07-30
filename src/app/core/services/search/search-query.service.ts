import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '@app/api/services';
import { SearchFilterStateConverter } from '@app/core/services/search/search-filter-state-converter.service';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { SearchFilterFormValue } from '../../../search/interfaces/search-filter-form-value.interface';

const DEBOUNCE_DURATION_MS = 200;

@Injectable()
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

  public searchByFormValue(formValue: SearchFilterFormValue): void {
    const params = this.searchFilterStateConverter.getSearchListParams(formValue);
    this.setSearchParams(params);
  }

  public setSearchParam(key: string, value: string): void {
    const newParams = {
      ...this.params$.value,
      [key]: value,
    };
    this.setSearchParams(newParams);
  }

  private setSearchParams(params: SearchService.SearchListParams): void {
    return this.params$.next(params);
  }
}
