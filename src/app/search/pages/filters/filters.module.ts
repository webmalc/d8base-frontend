import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchPageModule } from '@app/search/search.module';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { FiltersPageRoutingModule } from './filters-routing.module';
import { FiltersPage } from './filters.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    FiltersPageRoutingModule,
    SearchPageModule,
  ],
  declarations: [FiltersPage],
})
export class FiltersPageModule {
}
