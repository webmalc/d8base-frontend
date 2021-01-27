import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Price } from '@app/api/models';
import { CurrencyListApiService } from '@app/core/services/currency-list-api.service';
import { UserSettingsService } from '@app/shared/services/user-settings.service';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

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
  public initialValues: Partial<Price> = {};
  public initialCurrency: string;

  private value: any;
  private onChange: (value: any) => void;

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
    // do nothing
  }

  public writeValue(value: Price): void {
    this.value = value;
    this.initialValues = {
      ...value,
    };
    this.initialCurrency = value?.price_currency ?? value?.start_price_currency;
  }

  public writeField(field: string, event: CustomEvent) {
    const value: string = event.detail.value;
    this.value = {
      ...this.value,
      [field]: value,
    };
    this.onChange(this.value);
  }

  public toggleFixedPrice(event: CustomEvent) {
    this.isPriceFixed$.next(event.detail.checked);
  }
}
