import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Price } from '@app/api/models';
import { Currency } from '@app/core/models/currency';
import { CurrencyListApiService } from '@app/core/services/currency-list-api.service';
import { UserSettingsService } from '@app/shared/services/user-settings.service';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

const defaultValue: Partial<Price> = { is_price_fixed: true };

@Component({
  selector: 'app-price-editor',
  templateUrl: './price-editor.component.html',
  styleUrls: ['./price-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PriceEditorComponent),
      multi: true,
    },
  ],
})
export class PriceEditorComponent implements ControlValueAccessor {

  public currency$: Observable<{ list; default }>;
  public isPriceFixed$ = new BehaviorSubject<boolean>(true);
  public initialValues: Partial<Price> = defaultValue;

  private currencyCode: string;
  private value: Partial<Price> = defaultValue;
  private onChange: (value: any) => void;
  private onTouched: () => void;

  constructor(
    private readonly currencyApi: CurrencyListApiService,
    private readonly userSettings: UserSettingsService,
  ) {
    this.currency$ = forkJoin([
      currencyApi.getList(),
      this.userSettings.userSettings$.pipe(
        first(x => !!x),
        map(settings => settings.currency),
      ),
    ]).pipe(
      map(([list, defaultCurrency]) => ({ list, default: list.find(x => x.currency === defaultCurrency) })),
    );
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public writeValue(value: Price): void {
    this.value = value ?? defaultValue;
    this.initialValues = value ? { ...value } : defaultValue;
    this.currencyCode = value?.price_currency ?? value?.start_price_currency;
    this.isPriceFixed$.next(this.initialValues.is_price_fixed);
  }

  public changeField<T>(field: string, value: T) {
    this.writeField(field, value);
    this.onChange(this.value);
  }

  public setCurrency(currency: Currency) {
    const code = currency.currency;
    this.currencyCode = code;
    if (!this.value.is_price_fixed) {
      this.writeField('start_price_currency', code);
      this.writeField('end_price_currency', code);
    } else {
      this.writeField('price_currency', code);
    }
  }

  public toggleFixedPrice(event: CustomEvent) {
    const isPriceFixed: boolean = event.detail.checked;
    this.isPriceFixed$.next(isPriceFixed);
    this.writeField('is_price_fixed', isPriceFixed);
  }

  public getInitialCurrency(list: Currency[], defaultCurrency: Currency): Currency {
    const result = list.find(c => c.currency === this.currencyCode) ?? defaultCurrency;
    this.setCurrency(result);

    return result;
  }

  private writeField<T>(field: string, value: T) {
    this.value = {
      ...this.value,
      [field]: value,
    };
  }
}
