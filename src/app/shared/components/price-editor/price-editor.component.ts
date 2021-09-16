import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Price, Rate } from '@app/api/models';
import { NgDestroyService } from '@app/core/services';
import { RatesApiCache } from '@app/core/services/cache';
import { UserSettingsService } from '@app/core/services/facades/user-settings.service';
import { forkJoin, Observable } from 'rxjs';
import { first, map, shareReplay, take, takeUntil } from 'rxjs/operators';

const defaultValue: Price = { is_price_fixed: true, payment_methods: [], service: void 0 };

function findCurrency(price: Price, list: Rate[]): Rate {
  const currencyCode = price?.price_currency ?? price?.start_price_currency;
  return list.find(c => c.currency === currencyCode);
}

@Component({
  selector: 'app-price-editor',
  templateUrl: './price-editor.component.html',
  styleUrls: ['./price-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PriceEditorComponent),
      multi: true,
    },
    NgDestroyService,
  ],
})
export class PriceEditorComponent implements ControlValueAccessor {
  public currency$: Observable<{ list: Rate[]; default: Rate }>;
  public value: Price = defaultValue;
  public rateControl = new FormControl();

  private onChange: (value: any) => void;
  private onTouched: () => void;

  constructor(
    ratesApi: RatesApiCache,
    private readonly userSettings: UserSettingsService,
    private readonly destroy$: NgDestroyService,
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

    this.subscribeCurrencyControlValues();
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

  public changeField<T>(field: keyof Price, value: T): void {
    this.writeField(field, value);
    if (this.onChange) {
      this.onChange(this.value);
    }
  }

  public setCurrency(rate: Rate): void {
    const code = rate.currency;
    if (!this.value.is_price_fixed) {
      this.writeField('start_price_currency', code);
      this.writeField('end_price_currency', code);
    } else {
      this.writeField('price_currency', code);
    }
  }

  public toggleFixedPrice(event: CustomEvent): void {
    const isPriceFixed: boolean = event.detail.checked;
    this.changeField('is_price_fixed', isPriceFixed);
  }

  private subscribeCurrencyControlValues(): void {
    this.rateControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(rate => {
      this.setCurrency(rate);
      this.onChange(this.value);
    });
  }

  private setDisplayedCurrency(price: Price): void {
    this.currency$.pipe(take(1)).subscribe(currency => {
      const rate = findCurrency(price, currency.list) ?? currency.default;
      this.rateControl.setValue(rate, { emitEvent: false });
      this.setCurrency(rate);
    });
  }

  private writeField<T>(field: keyof Price, value: T): void {
    this.value = {
      ...this.value,
      [field]: value,
    };
  }
}
