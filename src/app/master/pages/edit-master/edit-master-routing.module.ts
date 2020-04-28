import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditMasterPage } from './edit-master.page';

const routes: Routes = [
  {
    path: '',
    component: EditMasterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditMasterPageRoutingModule {}
