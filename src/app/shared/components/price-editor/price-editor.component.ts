import { ChangeDetectorRef, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Price, Rate } from '@app/api/models';
import { RatesApiCache } from '@app/core/services/cache';
import { UserSettingsService } from '@app/shared/services/user-settings.service';
import { forkJoin, Observable } from 'rxjs';
import { first, map, shareReplay, take } from 'rxjs/operators';

const defaultValue: Price = { is_price_fixed: true, payment_methods: [], service: void 0 };

function findCurrency(price: Price, list: Rate[]): Rate {
  const currencyCode = price?.price_currency ?? price?.start_price_currency;
  return list.find(c => c.currency === currencyCode);
}

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
  public currency$: Observable<{ list: Rate[]; default: Rate }>;
  public value: Price = defaultValue;

  private _displayedCurrency: Rate;
  private onChange: (value: any) => void;
  private onTouched: () => void;

  constructor(
    ratesApi: RatesApiCache,
    private readonly userSettings: UserSettingsService,
    private readonly changeDetector: ChangeDetectorRef,
  ) {
    this.currency$ = forkJoin([
      ratesApi.list(),
      this.userSettings.userSettings$.pipe(
        first(x => !!x),
        map(settings => settings.currency),
      ),
    ]).pipe(
      map(([list, defaultCurrency]) => ({ list, default: list.find(x => x.currency === defaultCurrency) })),
      shareReplay(1),
    );
  }

  public get displayedCurrency(): Rate {
    return this._displayedCurrency;
  }

  public set displayedCurrency(rate: Rate) {
    this._displayedCurrency = rate;
    this.changeDetector.markForCheck();
    if (rate) {
      this.setCurrency(rate);
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public writeValue(value: Price): void {
    this.value = value ?? defaultValue;
    this.setDisplayedCurrency(value);
  }

  public changeField<T>(field: keyof Price, value: T) {
    this.value = {
      ...this.value,
      [field]: value,
    };
    if (this.onChange) {
      this.onChange(this.value);
    }
  }

  public setCurrency(rate: Rate) {
    const code = rate.currency;
    if (!this.value.is_price_fixed) {
      this.changeField('start_price_currency', code);
      this.changeField('end_price_currency', code);
    } else {
      this.changeField('price_currency', code);
    }
  }

  public toggleFixedPrice(event: CustomEvent) {
    const isPriceFixed: boolean = event.detail.checked;
    this.changeField('is_price_fixed', isPriceFixed);
  }

  private setDisplayedCurrency(price: Price): void {
    this.currency$
      .pipe(take(1))
      .subscribe(currency => (this.displayedCurrency = findCurrency(price, currency.list) ?? currency.default));
  }
}
