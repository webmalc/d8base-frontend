import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  ],
})
export class PhoneEditorComponent implements ControlValueAccessor {
  public innerControl = new FormControl();

  public registerOnChange(fn: any): void {
    this.innerControl.registerOnChange(fn);
  }

  public registerOnTouched(fn: any): void {
    // do nothing
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.innerControl.disable();
    } else {
      this.innerControl.enable();
    }
  }

  public writeValue(value: string): void {
    this.innerControl.setValue(value, { emitEvent: false });
  }

  public onPhoneFocus(phone: string): void {
    if (phone === '') {
      this.innerControl.setValue('+');
    }
  }

  public onPhoneBlur(phone: string): void {
    if (phone === '+') {
      this.innerControl.setValue('');
    }
  }

  public onPhoneInputChange(phone: string): void {
    const inputNumericVal = phone.replace(/\D/g, '');
    let inputNewValue = '';
    inputNewValue += `+${inputNumericVal}`;

    this.innerControl.setValue(inputNewValue);
  }

  public onPhoneChange(phone: string): void {
    if (phone !== '+' && isNaN(parseInt(phone, 10)) && phone.slice(-1) === phone) {
      this.innerControl.setValue(phone.slice(0, -1));
    }
  }
}
