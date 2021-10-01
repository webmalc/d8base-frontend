import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { getLocalDateString } from '@app/core/functions/datetime.functions';
import { ResolvedUserLocation } from '@app/core/interfaces/user-location.interface';
import {
  SearchFilterFormControls,
  SearchFilterFormValue,
} from '@app/search/interfaces/search-filter-form-value.interface';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { RatesApiCache } from '../cache';
import { UserSettingsService } from '../facades';

/**
 * Search for services up to 2 years in future
 */
const FUTURE_TIMESPAN_YEARS = 2;

@Injectable()
export class SearchFilterStateService {
  public controls: SearchFilterFormControls = {
    query: new FormControl(null),
    country: new FormControl(null),
    city: new FormControl(null),
    category: new FormControl(null),
    subcategory: new FormControl(null),
    tags: new FormControl(null),
    isOnlineBooking: new FormControl(null),
    isInstantBooking: new FormControl(null),
    dateFrom: new FormControl(null),
    dateTo: new FormControl(null),
    timeFrom: new FormControl(null),
    timeTo: new FormControl(null),
    isOnlineService: new FormControl(null),
    isAtMasterLocationService: new FormControl(null),
    isAtClientLocationService: new FormControl(null),
    priceCurrency: new FormControl(null),
    priceStart: new FormControl({ value: null, disabled: true }),
    priceEnd: new FormControl({ value: null, disabled: true }),
    rating: new FormControl(null),
    professionalLevel: new FormControl(null),
    paymentMethods: new FormControl(null),
    onlyWithReviews: new FormControl(null),
    onlyWithPhotos: new FormControl(null),
    onlyWithFixedPrice: new FormControl(null),
    onlyWithCertificates: new FormControl(null),
    nationality: new FormControl(null),
    languages: new FormControl(null),
    experience: new FormControl(null),
    startAge: new FormControl(null),
    endAge: new FormControl(null),
    exactDatetime: new FormControl(null),
  };
  public form = new FormGroup(this.controls);

  public minDate: string;
  public maxDate: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userSettingsService: UserSettingsService,
    private readonly ratesCache: RatesApiCache,
  ) {
    this.setMinMaxDates();
    this.setDefaultCurrency();
    this.handleCurrencySelectorChanges();
  }

  public patchValue(formValue: SearchFilterFormValue): void {
    this.form.patchValue(formValue, { emitEvent: false });
    if (!formValue.priceCurrency) {
      this.setDefaultCurrency();
    }
  }

  public updateLocation(location: ResolvedUserLocation): void {
    if (location) {
      this.controls.country.setValue(location.country);
      this.controls.city.setValue(location.city);
    }
  }

  private setMinMaxDates(): void {
    const now = new Date(Date.now());
    this.minDate = getLocalDateString(now);
    this.maxDate = getLocalDateString(new Date(now.setFullYear(now.getFullYear() + FUTURE_TIMESPAN_YEARS)));
  }

  private setDefaultCurrency(): void {
    combineLatest([this.ratesCache.list(), this.userSettingsService.userSettings$])
      .pipe(take(1))
      .subscribe(([rates, settings]) => {
        const currency = rates.find(c => c.currency === settings.currency);
        this.controls.priceCurrency.setValue(currency, { emitEvent: false });
      });
  }

  private handleCurrencySelectorChanges(): void {
    const priceInputs = [this.controls.priceStart, this.controls.priceEnd];

    this.controls.priceCurrency.valueChanges.subscribe(value => {
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
