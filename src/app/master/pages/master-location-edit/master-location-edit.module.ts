import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from '@app/shared/shared.module';
import { MasterLocationEditPageRoutingModule } from './master-location-edit-routing.module';

import { MasterLocationEditPage } from './master-location-edit.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MasterLocationEditPageRoutingModule, SharedModule],
  declarations: [MasterLocationEditPage],
})
export class MasterLocationEditPageModule {}
