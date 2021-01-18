import { ChangeDetectionStrategy, Component, forwardRef, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-rating-picker',
  templateUrl: './rating-picker.component.html',
  styleUrls: ['./rating-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => RatingPickerComponent),
  //     multi: true,
  //   },
  // ],
})
export class RatingPickerComponent implements OnInit, ControlValueAccessor {
  public readonly ratings: number[] = [1, 2, 3, 4, 5];
  public selectedRating: number;
  public disabled: boolean = false;
  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {}

  public onChange: (rate: number) => void = () => {
    return;
  };

  public onTouched = () => {
    return;
  };

  public writeValue(rating: number): void {
    this.selectedRating = this.ratings.includes(rating) ? rating : null;
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
    this.selectedRating = rating;
    this.onChange(this.selectedRating);
  }
}
