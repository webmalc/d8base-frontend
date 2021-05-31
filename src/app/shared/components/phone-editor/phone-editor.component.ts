import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Country } from '@app/api/models';
import { NgDestroyService } from '@app/core/services';
import { CountriesApiCache } from '@app/core/services/cache';
import { combineLatest } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

const DEFAULT_COUNTRY: Partial<Country> = { id: 6251999, name: 'Canada', tld: 'ca', phone: '+1' };
@Component({
  selector: 'app-phone-editor',
  templateUrl: './phone-editor.component.html',
  styleUrls: ['./phone-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneEditorComponent),
      multi: true,
    },
    NgDestroyService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneEditorComponent implements ControlValueAccessor {
  public phoneControl = new FormControl();
  public countryControl = new FormControl(DEFAULT_COUNTRY);
  public previousPhoneValue: string = '';
  public countries$ = this.countriesApi.list();
  public title = 'location-edit-page.country';
  private onChange: (value: string) => void;
  private onTouch: (value: string) => void;

  constructor(
    private readonly countriesApi: CountriesApiCache,
    private readonly ngDestroy$: NgDestroyService,
    private readonly cd: ChangeDetectorRef,
  ) {
    this.subscribeCountryCodeControlValueChanges();
    this.subscribeControlValuesChanges();
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.countryControl.disable();
      this.phoneControl.disable();
    } else {
      this.countryControl.enable();
      this.phoneControl.enable();
    }
  }

  public writeValue(value: string): void {
    // do nothing
  }

  public plusSignEnforce(countryPhone: Country['phone']): string {
    return !countryPhone?.length || countryPhone?.includes('+') ? countryPhone : `+${countryPhone}`;
  }

  private subscribeCountryCodeControlValueChanges(): void {
    this.countryControl.valueChanges.pipe(takeUntil(this.ngDestroy$)).subscribe(() => {
      this.cd.markForCheck();
    });
  }

  private subscribeControlValuesChanges(): void {
    combineLatest([
      this.countryControl.valueChanges.pipe(startWith(this.countryControl.value)),
      this.phoneControl.valueChanges.pipe(startWith(this.phoneControl.value)),
    ])
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(([country, phone]) => {
        const countryCode = this.plusSignEnforce(country.phone);
        const value: string = phone && country ? `${countryCode}${phone}` : '';
        if (this.onChange) {
          this.onChange(value);
        }
        this.cd.markForCheck();
      });
  }
}
