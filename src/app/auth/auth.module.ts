import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {AuthRoutingModule} from './auth-routing.module';

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
