import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MasterEditComponent} from '@app/master/components/master-edit/master-edit.component';
import {IonicModule} from '@ionic/angular';
import {MasterEditPageRoutingModule} from './master-edit-routing.module';
import {MasterEditPage} from './master-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasterEditPageRoutingModule
  ],
  declarations: [MasterEditPage, MasterEditComponent]
})
export class MasterEditPageModule {
}
