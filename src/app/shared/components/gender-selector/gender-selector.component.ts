import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Profile } from '@app/api/models';

type Gender = Profile['gender'];

@Component({
  selector: 'app-gender-selector',
  templateUrl: './gender-selector.component.html',
  styleUrls: ['./gender-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenderSelectorComponent),
      multi: true,
    },
  ],

})
export class GenderSelectorComponent implements ControlValueAccessor {
  public defaultValue: Gender = null;
  public disabled: boolean;

  private onChange: (value: Gender) => void;
  private onTouched: () => void;

  public registerOnChange(fn: (value: Gender) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public writeValue(value: Gender): void {
    this.defaultValue = value;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public change(event: CustomEvent): void {
    const value: Gender = event.detail.value;
    this.onChange(value);
  }
}
