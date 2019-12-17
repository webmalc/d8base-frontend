import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginPageModule} from './components/pages/login/login.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    LoginPageModule
  ],
  declarations: [

  ]
})
export class AuthModule { }
