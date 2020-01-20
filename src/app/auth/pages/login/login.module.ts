import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import {LoginPage} from './login.page';
import {SharedModule} from '@app/shared/shared.module';
import {LoginFormComponent} from '@app/auth/components/login-form/login-form.component';
import {TokenManagerService} from '@app/auth/services/token-manager.service';
import {LoginFormService} from '@app/auth/forms/login-form.service';


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
export class LoginPageModule {}
