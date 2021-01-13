import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Optional, SkipSelf } from '@angular/core';
import { AbstractControl, ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-form-control-error',
  templateUrl: './form-control-error.component.html',
  styleUrls: ['./form-control-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormControlErrorComponent implements OnInit {
  @Input() public control: AbstractControl;
  @Input() public filterErrors: string[] = ['required'];
  @Input() public showErrors: string[] = null;
  @Input() public readonly errorDescriptions: { key: string };
  @Input() set controlName(name: string) {
    this.control = this.controlContainer?.control.get(name);
  }
  public errors: { key: string; param: any }[];

  constructor(@Optional() @SkipSelf() private readonly controlContainer: ControlContainer, private readonly cd: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.control?.valueChanges.subscribe(() => {
      if (!this.control.invalid && !this.control.dirty) {
        return;
      }
      this.errors = this.control.errors
        ? Object.keys(this.control.errors)
            .filter(key => !this.filterErrors.includes(key))
            .filter(key => !Boolean(this.showErrors?.length) || this.showErrors.includes(key))
            .map(key => ({
              key: this.errorDescriptions?.[key] ?? `form-errors.${key}`,
              param: this.control.errors[key],
            }))
        : [];
      this.cd.markForCheck();
    });
  }
}
