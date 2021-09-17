import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchService } from '@app/api/services';
import { fromArray, toArray } from '@app/core/functions/string.functions';

export interface SearchFilter {
  name?: keyof SearchService.SearchListParams;
  value?: any;
}

@Component({
  selector: 'app-applied-filters',
  templateUrl: './applied-filters.component.html',
  styleUrls: ['./applied-filters.component.scss'],
})
export class AppliedFiltersComponent {
  @Output()
  public deleteFilter = new EventEmitter<string>();

  @Output()
  public updateFilter = new EventEmitter<{ key: string; value: string }>();

  public fields: { [key in keyof SearchService.SearchListParams]: keyof SearchService.SearchListParams } = {
    query: 'query',
    country: 'country',
    city: 'city',
    categories: 'categories',
    subcategories: 'subcategories',
    onlyWithAutoOrderConfirmation: 'onlyWithAutoOrderConfirmation',
    startDatetime: 'startDatetime',
    endDatetime: 'endDatetime',
    serviceTypes: 'serviceTypes',
    startPrice: 'startPrice',
    endPrice: 'endPrice',
    priceCurrency: 'priceCurrency',
    ratingFrom: 'ratingFrom',
    onlyWithReviews: 'onlyWithReviews',
    onlyWithPhotos: 'onlyWithPhotos',
    onlyWithFixedPrice: 'onlyWithFixedPrice',
    onlyWithCertificates: 'onlyWithCertificates',
    startAge: 'startAge',
    endAge: 'endAge',
    nationalities: 'nationalities',
    languages: 'languages',
    professionalLevel: 'professionalLevel',
    experience: 'experience',
    paymentMethods: 'paymentMethods',
    exactDatetime: 'exactDatetime',
  };

  private _filters: SearchFilter[];

  @Input()
  public set params(params: SearchService.SearchListParams) {
    this._filters = Object.entries(params ?? {})
      .map(f => {
        const name = (f[0] as unknown) as SearchFilter['name'];
        const value = f[1];
        return { name, value };
      })
      .filter(f => !!f.value);
  }

  public get filters(): SearchFilter[] {
    return this._filters;
  }

  public delete(keys: string | string[], values: string = '', valueToRemove: string = ''): void {
    const keysArray = typeof keys === 'string' ? [keys] : keys;
    if (valueToRemove) {
      const key = keysArray[0];
      const newValue = fromArray(toArray(values).filter(s => s !== valueToRemove));
      if (newValue) {
        this.updateFilter.emit({ key, value: newValue });
      } else {
        this.deleteFilter.emit(key);
      }
    } else {
      keysArray.forEach(key => this.deleteFilter.emit(key));
    }
  }
}
