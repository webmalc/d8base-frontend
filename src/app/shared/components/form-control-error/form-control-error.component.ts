import { ChangeDetectionStrategy, Component, Input, OnInit, Optional, SkipSelf } from '@angular/core';
import { AbstractControl, ControlContainer } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  public errors: Observable<{ key: string; param: any }[]>;

  constructor(@Optional() @SkipSelf() private readonly controlContainer: ControlContainer) {}

  public ngOnInit(): void {
    this.errors = this.control.statusChanges.pipe(
      map(() =>
        this.control.dirty && this.control.errors
          ? Object.keys(this.control.errors)
              .filter(key => !this.filterErrors.includes(key))
              .filter(key => !Boolean(this.showErrors?.length) || this.showErrors.includes(key))
              .map(key => ({
                key: this.errorDescriptions?.[key] ?? `form-errors.${key}`,
                param: this.control.errors[key],
              }))
          : [],
      ),
    );
  }
}
