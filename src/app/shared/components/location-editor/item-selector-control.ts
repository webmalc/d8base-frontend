import { ControlValueAccessor } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

export abstract class ItemSelectorControl<T> implements ControlValueAccessor {
  public abstract items$: Observable<T[]>;
  public abstract title: string;
  public initialValue: T;
  public disabled: boolean;
  public required: boolean;
  public hasData$: Observable<boolean> = of(true).pipe(shareReplay(1));

  public change(event: { component: unknown; value: T }) {
    this.initialValue = event.value;
    this.onChange(event.value);
  }

  public registerOnChange(fn: (v: T) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public writeValue(value: T): void {
    this.initialValue = value;
  }

  private onChange: (v: T) => void = () => null;
  private onTouched: () => void = () => null;
}
