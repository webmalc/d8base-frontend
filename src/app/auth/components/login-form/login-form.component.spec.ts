import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {ErrorFlashbagComponent} from '@app/shared/components/error-flashbag/error-flashbag.component';
import {IonicModule} from '@ionic/angular';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {LoginFormFields} from '../../enums/login-form-fields';
import {LoginFormService} from '../../forms/login-form.service';
import {Credentials} from '../../interfaces/credentials';
import {LoginFormComponent} from './login-form.component';

describe('LoginFormComponent', () => {
    let component: LoginFormComponent;
    let fixture: ComponentFixture<LoginFormComponent>;
    let router: Router;
    // Ionic Angular was already initialized. Make sure IonicModule.forRoot() is just called once.
    // But if remove 'forRoot()' - test submit login form don't pass. Magick!
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [LoginFormComponent, ErrorFlashbagComponent],
            imports: [IonicModule.forRoot(), ReactiveFormsModule, FormsModule, RouterTestingModule, TranslateModule.forRoot()],
            providers: [
                LoginFormService,
                TranslateService
            ]
        }).compileComponents();

        router = TestBed.inject(Router);
        spyOn(router, 'navigateByUrl');

        fixture = TestBed.createComponent(LoginFormComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect((component as any).loginFormService.form.valid).toBeFalsy();
    });

    it('test submit login form', waitForAsync(() => {
        const username = component.loginFormService.form.controls[LoginFormFields.Username];
        const password = component.loginFormService.form.controls[LoginFormFields.Password];
        password.setValue('valid_pass');
        username.setValue('valid');

        spyOn((component as any).user, 'emit');

        fixture.debugElement.nativeElement.querySelector('ion-button').click();
        const newUser: Credentials = {username: 'valid', password: 'valid_pass'};
        expect((component as any).user.emit).toHaveBeenCalledWith(newUser);
    }));
});

