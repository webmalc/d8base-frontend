import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PaymentMethod, PaymentMethods } from './payment-methods.type';

@Component({
  selector: 'app-payment-method-editor',
  templateUrl: './payment-method-editor.component.html',
  styleUrls: ['./payment-method-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PaymentMethodEditorComponent),
      multi: true,
    },
  ],
})
export class PaymentMethodEditorComponent implements ControlValueAccessor {
  public checked: { [key in PaymentMethod]?: boolean } = {};

  private value: Set<PaymentMethod> = new Set();
  private onChange: (value: PaymentMethods) => void;

  public toggle(method: PaymentMethod, event: CustomEvent): void {
    const checked: boolean = event.detail.checked;
    if (checked) {
      this.value.add(method);
    } else {
      this.value.delete(method);
    }
    this.onChange([...this.value.values()]);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    // do nothing
  }

  public writeValue(value: PaymentMethods): void {
    this.value = new Set(value);
    this.checked = {
      cash: this.value.has('cash'),
      online: this.value.has('online'),
    };
  }
}
