import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Credentials} from '@app/auth/interfaces/credentials';
import {Reinitable} from '@app/shared/abstract/reinitable';
import {LoginFormFields} from '../../enums/login-form-fields';
import {LoginFormService} from '../../forms/login-form.service';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent extends Reinitable implements OnInit {

    @Input() public errorMessage: string;
    public readonly formFields = LoginFormFields;
    @Output() private user = new EventEmitter<Credentials>();

    constructor(
        public readonly loginFormService: LoginFormService,
        private readonly router: Router
    ) {
        super();
    }

    public ngOnInit(): void {
        this.loginFormService.initForm();
    }

    public submitLoginForm(): void {
        if (this.loginFormService.form.invalid) {
            return;
        }
        const data = this.loginFormService.form.getRawValue();
        const credentials = {
            username: data[LoginFormFields.Username],
            password: data[LoginFormFields.Password]
        };
        this.user.emit(credentials);
    }

    public onForgotPassword(): void {
        this.router.navigateByUrl('/auth/password-recover');
    }
}
