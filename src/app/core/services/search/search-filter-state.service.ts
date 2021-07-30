import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { getLocalDateString } from '@app/core/functions/datetime.functions';
import { SearchFilterFormFields } from '../../../search/const/search-filters-form';

/**
 * Search for services up to 2 years in future
 */
const FUTURE_TIMESPAN_YEARS = 2;

@Injectable()
export class SearchFilterStateService {
  public formFields = SearchFilterFormFields;
  public searchForm: FormGroup = this.fb.group({
    [this.formFields.query]: null,
    [this.formFields.country]: null,
    [this.formFields.city]: null,
    [this.formFields.category]: null,
    [this.formFields.subcategory]: null,
    [this.formFields.tags]: null,
    [this.formFields.isOnlineBooking]: null,
    [this.formFields.isInstantBooking]: null,
    [this.formFields.dateFrom]: null,
    [this.formFields.dateTo]: null,
    [this.formFields.timeFrom]: null,
    [this.formFields.timeTo]: null,
    [this.formFields.isOnlineService]: null,
    [this.formFields.isAtMasterLocationService]: null,
    [this.formFields.isAtClientLocationService]: null,
    [this.formFields.priceCurrency]: null,
    [this.formFields.priceStart]: { value: null, disabled: true },
    [this.formFields.priceEnd]: { value: null, disabled: true },
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
    [this.formFields.exactDatetime]: null,
  });

  public minDate: string;
  public maxDate: string;

  constructor(private readonly fb: FormBuilder) {
    this.setMinMaxDates();
    this.handleCurrencySelectorChanges();
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
      this.searchForm.controls[this.formFields.priceStart],
      this.searchForm.controls[this.formFields.priceEnd],
    ];

    this.searchForm.controls[this.formFields.priceCurrency].valueChanges.subscribe(value => {
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
