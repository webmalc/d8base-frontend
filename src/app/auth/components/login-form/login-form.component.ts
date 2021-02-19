import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Credentials } from '@app/auth/interfaces/credentials';
import { LoginFormFields } from '../../enums/login-form-fields';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  public form: FormGroup = this.fb.group({
    [LoginFormFields.Username]: ['', [Validators.required, Validators.email]],
    [LoginFormFields.Password]: ['', Validators.required],
  });
  @Input() public errorMessages: string[];
  public readonly formFields = LoginFormFields;
  @Output() public readonly user = new EventEmitter<Credentials>();

  constructor(private readonly fb: FormBuilder) {}

  public submitLoginForm(): void {
    if (this.form.invalid) {
      return;
    }

    this.user.emit(this.form.value);
  }
}
