import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditMasterPageRoutingModule } from './edit-master-routing.module';

import {EditMasterFormService} from '@app/master/forms/edit-master-form.service';
import {TranslateModule} from '@ngx-translate/core';
import { EditMasterPage } from './edit-master.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditMasterPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [EditMasterPage],
  providers: [EditMasterFormService]
})
export class EditMasterPageModule {}
