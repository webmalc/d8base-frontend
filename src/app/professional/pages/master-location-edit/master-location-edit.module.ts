import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocationEditorModule } from '@app/shared/location-editor/location-editor.module';

import { SharedModule } from '@app/shared/shared.module';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { MasterLocationEditPageRoutingModule } from './master-location-edit-routing.module';
import { MasterLocationEditPage } from './master-location-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasterLocationEditPageRoutingModule,
    SharedModule,
    TranslateModule,
    LocationEditorModule,
  ],
  declarations: [MasterLocationEditPage],
})
export class MasterLocationEditPageModule {}
