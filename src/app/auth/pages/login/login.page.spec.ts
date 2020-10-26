import {ComponentFixture, fakeAsync, flush, TestBed, waitForAsync} from '@angular/core/testing';

import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {ApiClientService} from '@app/core/services/api-client.service';
import {AuthenticationService} from '@app/core/services/authentication.service';
import {TokenManagerService} from '@app/core/services/token-manager.service';
import {ErrorFlashbagComponent} from '@app/shared/components/error-flashbag/error-flashbag.component';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

import {ApiClientServiceMock, TokenManagerServiceMock} from 'src/testing/mocks';
import {LoginFormComponent} from '../../components/login-form/login-form.component';
import {LoginFormService} from '../../forms/login-form.service';
import {Credentials} from '../../interfaces/credentials';
import {LoginPage} from './login.page';

describe('LoginPage', () => {
    let component: LoginPage;
    let fixture: ComponentFixture<LoginPage>;
    let router: Router;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [LoginPage, LoginFormComponent, ErrorFlashbagComponent],
            imports: [IonicModule, ReactiveFormsModule, FormsModule, RouterTestingModule, TranslateModule.forRoot()],
            providers: [
                {provide: ApiClientService, useClass: ApiClientServiceMock},
                LoginFormService,
                FormBuilder,
                AuthenticationService,
                {provide: TokenManagerService, useClass: TokenManagerServiceMock}
            ]
        }).compileComponents();

        router = TestBed.inject<Router>(Router);
        spyOn(router, 'navigateByUrl');

        fixture = TestBed.createComponent(LoginPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('test nested component exists', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('app-login-form')).not.toBe(null);
        expect(compiled.querySelector('app-login-form ion-input[name="email"]')).not.toBe(null);
        expect(compiled.querySelector('app-login-form ion-input[name="password"]')).not.toBe(null);
    });

    // xit('test valid auth data submit', fakeAsync(() => {
    //     const user: Credentials = {username: 'valid', password: 'valid_pass'};
    //
    //     component.onSubmitLoginForm(user);
    //     flush();
    //
    //     expect(router.navigateByUrl).toHaveBeenCalled();
    // }));

    it('test invalid auth data submit', fakeAsync(() => {

        const user: Credentials = {username: 'invalid', password: 'invalid'};

        component.onSubmitLoginForm(user);
        flush();

        expect(router.navigateByUrl).not.toHaveBeenCalled();
    }));
});

// ** TODO: Need to title test
