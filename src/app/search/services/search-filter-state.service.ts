import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { getLocalDateString } from '@app/core/functions/datetime.functions';
import { SearchFilterStateInterface } from '@app/search/interfaces/search-filter-state-interface';
import { SearchFilterFormFields, SearchFilterFormGroups } from '../const/search-filters-form';

/**
 * Search for services up to 2 years in future
 */
const FUTURE_TIMESPAN_YEARS = 2;

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

  constructor(private readonly fb: FormBuilder) {
    this.setMinMaxDates();
    this.handleCurrencySelectorChanges();
  }

  public setDate(datetime: SearchFilterStateInterface['datetime']): void {
    this.searchForm.get('datetime').setValue(datetime);
  }

  public clear(): void {
    this.searchForm.reset();
  }

  private setMinMaxDates(): void {
    const now = new Date(Date.now());
    this.minDate = getLocalDateString(now);
    this.maxDate = getLocalDateString(new Date(now.setFullYear(now.getFullYear() + FUTURE_TIMESPAN_YEARS)));
  }

  private handleCurrencySelectorChanges(): void {
    const priceInputs = [
      this.searchForm.get([this.formGroups.price, this.formFields.price.start]),
      this.searchForm.get([this.formGroups.price, this.formFields.price.end]),
    ];

    this.searchForm.get([this.formGroups.price, this.formFields.price.currency]).valueChanges.subscribe(value => {
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
