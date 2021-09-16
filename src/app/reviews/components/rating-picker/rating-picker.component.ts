import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-rating-picker',
  templateUrl: './rating-picker.component.html',
  styleUrls: ['./rating-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingPickerComponent implements ControlValueAccessor {
  public readonly ratings: number[] = [1, 2, 3, 4, 5];
  public selectedRating: number;
  public disabled: boolean = false;

  constructor(@Optional() @Self() public ngControl: NgControl, private readonly cd: ChangeDetectorRef) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  public onChange: (rating: number) => void = () => void 0;

  public onTouched: () => void = () => void 0;

  public writeValue(rating: number): void {
    this.selectedRating = this.ratings.includes(rating) ? rating : null;
    this.cd.markForCheck();
  }

  public registerOnChange(onChange: (rating: number) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public selectRating(rating: number): void {
    this.selectedRating = rating !== this.selectedRating ? rating : null;
    this.onChange(this.selectedRating);
  }
}
