import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {AuthRoutingModule} from './auth-routing.module';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AuthRoutingModule,
        ReactiveFormsModule
    ],
    declarations: []
})
export class AuthModule {
}
