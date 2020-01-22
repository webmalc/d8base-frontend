import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {LoginPageRoutingModule} from './login-routing.module';
import {LoginPage} from './login.page';
import {SharedModule} from '@app/shared/shared.module';
import {LoginFormComponent} from '@app/auth/components/login-form/login-form.component';
import {LoginFormService} from '@app/auth/forms/login-form.service';
import {TokenManagerService} from '@app/core/services/token-manager.service';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LoginPageRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        LoginPage,
        LoginFormComponent
    ],
    providers: [
        TokenManagerService,
        LoginFormService
    ]
})
export class LoginPageModule {
}
