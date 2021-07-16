import { ChangeDetectionStrategy, Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Price, Rate } from '@app/api/models';
import { NgDestroyService } from '@app/core/services';
import * as AppValidators from '@app/core/validators';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FullPriceFormFields } from './full-price-control-form-fields.enum';

const defaultValue: Price = { is_price_fixed: true, payment_methods: [], service: void 0 };

@Component({
  selector: 'app-full-price-control',
  templateUrl: './full-price-control.component.html',
  styleUrls: ['./full-price-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FullPriceControlComponent),
      multi: true,
    },
    NgDestroyService,
  ],
})
export class FullPriceControlComponent implements ControlValueAccessor, OnInit {
  public formFields = FullPriceFormFields;
  public currency$: Observable<{ list: Rate[]; default: Rate }>;
  public value: Price = defaultValue;
  public form = this.fb.group({
    [this.formFields.price]: [null, AppValidators.price],
    [this.formFields.paymentMethods]: [null, Validators.required],
  });

  private onChange: (value: any) => void;
  private onTouched: () => void;

  constructor(private readonly fb: FormBuilder, private readonly destroy$: NgDestroyService) {}

  public ngOnInit(): void {
    this.subscribeFormValueChanges();
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public writeValue(value: Price): void {
    this.value = value ?? defaultValue;
    this.form.patchValue(
      {
        [this.formFields.price]: this.value,
        [this.formFields.paymentMethods]: this.value.payment_methods,
      },
      { emitEvent: false },
    );
  }

  public subscribeFormValueChanges(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.value = { ...value[this.formFields.price], payment_methods: value[this.formFields.paymentMethods] };
      this.onChange && this.onChange(this.value);
    });
  }
}
