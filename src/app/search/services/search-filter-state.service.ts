import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchLocationDataInterface } from '@app/main/interfaces/search-location-data-interface';
import { SearchFilterStateInterface } from '@app/search/interfaces/search-filter-state-interface';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { SearchFilterFormFields, SearchFilterFormGroups } from '../const/search-filters-form';
import { SearchFilterStateConverter } from './search-filter-state-converter.service';

@Injectable({ providedIn: 'root' })
export class SearchFilterStateService {
  public formFields = SearchFilterFormFields;
  public formGroups = SearchFilterFormGroups;
  public searchForm: FormGroup = this.fb.group({
    [this.formFields.query]: null,
    [this.formGroups.location]: this.fb.group({
      [this.formFields.location.country]: null,
      [this.formFields.location.city]: null,
      [this.formFields.location.coordinates]: null,
    }),
    [this.formFields.category]: null,
    [this.formFields.subcategory]: null,
    [this.formFields.tags]: null,
    [this.formFields.isOnlineBooking]: null,
    [this.formFields.isInstantBooking]: null,
    [this.formGroups.datetime]: this.fb.group({
      [this.formFields.datetime.from]: null,
      [this.formFields.datetime.to]: null,
    }),
    [this.formFields.isOnlineService]: null,
    [this.formFields.isAtMasterLocationService]: null,
    [this.formFields.isAtClientLocationService]: null,
    [this.formGroups.price]: this.fb.group({
      [this.formFields.price.currency]: null,
      [this.formFields.price.start]: { value: null, disabled: true },
      [this.formFields.price.end]: { value: null, disabled: true },
    }),
    [this.formFields.rating]: null,
    [this.formFields.professionalLevel]: null,
    [this.formFields.paymentMethods]: null,
    [this.formFields.onlyWithReviews]: null,
    [this.formFields.onlyWithPhotos]: null,
    [this.formFields.onlyWithFixedPrice]: null,
    [this.formFields.onlyWithCertificates]: null,
    [this.formFields.nationalities]: null,
    [this.formFields.languages]: null,
    [this.formFields.experience]: null,
    [this.formFields.startAge]: null,
    [this.formFields.endAge]: null,
  });

  public minDate: string;
  public maxDate: string;
  private readonly doSearch$ = new Subject<void>();

  public get isDoingSearch$(): Observable<void> {
    return this.doSearch$.asObservable();
  }

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly searchFilterStateConverter: SearchFilterStateConverter,
  ) {
    this.doSearch$.pipe(debounceTime(200)).subscribe(() => {
      const queryParams = this.searchFilterStateConverter.getSearchListParams(this.searchForm.value);
      this.router.navigate(['/search'], { queryParams });
    });
    this.setMinMaxDates();
    this.handleCurrencySelectorChanges();
  }

  public doSearch(): void {
    return this.doSearch$.next();
  }

  public setLocationData(data: SearchLocationDataInterface): void {
    this.searchForm.get('location').setValue(data);
  }

  public setDate(datetime: SearchFilterStateInterface['datetime']): void {
    this.searchForm.get('datetime').setValue(datetime);
  }

  public clear(): void {
    this.searchForm.reset();
  }

  private setMinMaxDates(): void {
    const now = new Date(Date.now());
    const limitOfYearsInFuture = 5;
    this.minDate = now.toISOString();
    this.maxDate = new Date(now.setFullYear(now.getFullYear() + limitOfYearsInFuture)).toISOString();
  }

  private handleCurrencySelectorChanges(): void {
    const priceInputs = [
      this.searchForm.get([this.formGroups.price, this.formFields.price.start]),
      this.searchForm.get([this.formGroups.price, this.formFields.price.end]),
    ];

    this.searchForm
      .get([this.formGroups.price, this.formFields.price.currency])
      .valueChanges
      .subscribe(value => {
        if (!value) {
          priceInputs.forEach(input => {
            input.reset();
            input.disable();
          });
          return;
        }
        priceInputs.forEach(input => {
          input.enable();
        });
      });
  }
}
