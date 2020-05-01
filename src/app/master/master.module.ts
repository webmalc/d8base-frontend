import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasterPageRoutingModule } from './master-routing.module';

import {SubcategoriesApiService} from '@app/master/services/subcategories-api.service';
import { MasterPage } from './master.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasterPageRoutingModule
  ],
  declarations: [MasterPage],
  providers: [SubcategoriesApiService]
})
export class MasterPageModule {}
