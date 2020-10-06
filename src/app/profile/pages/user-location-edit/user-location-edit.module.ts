import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {UserLocationEditPageRoutingModule} from './user-location-edit-routing.module';

import {SharedModule} from '@app/shared/shared.module';
import {UserLocationEditPage} from './user-location-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserLocationEditPageRoutingModule,
    SharedModule
  ],
  declarations: [UserLocationEditPage]
})
export class UserLocationEditPageModule {
}
