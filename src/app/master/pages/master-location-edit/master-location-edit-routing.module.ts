import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MasterLocationEditPage } from './master-location-edit.page';

const routes: Routes = [
  {
    path: '',
    component: MasterLocationEditPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterLocationEditPageRoutingModule {
}
