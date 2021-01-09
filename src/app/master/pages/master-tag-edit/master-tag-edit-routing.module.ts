import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MasterTagEditPage } from './master-tag-edit.page';

const routes: Routes = [
  {
    path: '',
    component: MasterTagEditPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterTagEditPageRoutingModule {
}
