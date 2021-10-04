import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocationEditorModule } from '@app/shared/location-editor/location-editor.module';

import { SharedModule } from '@app/shared/shared.module';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { UserLocationEditPageRoutingModule } from './user-location-edit-routing.module';
import { UserLocationEditPage } from './user-location-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserLocationEditPageRoutingModule,
    SharedModule,
    TranslateModule,
    LocationEditorModule,
  ],
  declarations: [UserLocationEditPage],
})
export class UserLocationEditPageModule {}
