import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Credentials } from '@app/auth/interfaces/credentials';
import { AppValidators } from '@app/core/validators/app.validators';
import { LoginFormFields } from '../../enums/login-form-fields';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  public form: FormGroup = this.fb.group({
    [LoginFormFields.Username]: ['', [Validators.required, AppValidators.email]],
    [LoginFormFields.Password]: ['', Validators.required],
  });
  public readonly formFields = LoginFormFields;
  @Output() public readonly user = new EventEmitter<Credentials>();
  private _pending: boolean;

  constructor(private readonly fb: FormBuilder) {
  }

  public get pending(): boolean {
    return this._pending;
  }

  @Input()
  public set pending(value: boolean) {
    this._pending = value;
    if (value) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  public submitLoginForm(): void {
    if (this.form.invalid) {
      return;
    }

    this.user.emit(this.form.value);
  }
}
