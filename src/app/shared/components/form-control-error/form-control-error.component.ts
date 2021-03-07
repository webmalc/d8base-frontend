import { ChangeDetectionStrategy, Component, Input, OnInit, Optional, SkipSelf } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup } from '@angular/forms';
import { flatten } from '@app/core/functions/array.functions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

function getControlErrors(control: AbstractControl): { key: string; param: any }[] {
  const childrenErrors = (control instanceof FormGroup)
    ? flatten(Object.values(control.controls).map(control => getControlErrors(control))) : [];

  const parentErrors = (control.errors ? Object.keys(control.errors) : []).map(
    key => ({ key, param: control.errors[key] }),
  );

  return childrenErrors.concat(parentErrors);
}

@Component({
  selector: 'app-form-control-error',
  templateUrl: './form-control-error.component.html',
  styleUrls: ['./form-control-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormControlErrorComponent implements OnInit {
  @Input() public control: AbstractControl;
  @Input() public filterErrors: string[] = [];
  @Input() public showErrors: string[] = null;
  @Input() public readonly errorDescriptions: { key: string };
  public errors: Observable<{ key: string; param: any }[]>;

  constructor(@Optional() @SkipSelf() private readonly controlContainer: ControlContainer) {
  }

  @Input()
  public set controlName(name: string) {
    this.control = this.controlContainer?.control.get(name);
  }

  public ngOnInit(): void {
    this.errors = this.control?.statusChanges.pipe(
      map(() =>
        this.control.dirty && this.control.invalid
          ? getControlErrors(this.control)
            .filter(e => !this.filterErrors.includes(e.key))
            .filter(e => !Boolean(this.showErrors?.length) || this.showErrors.includes(e.key))
            .map(e => ({
              key: this.errorDescriptions?.[e.key] ?? `form-errors.${e.key}`,
              param: e.param,
            }))
          : [],
      ),
    );
  }
}
