import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MasterEditPage } from './master-edit.page';

const routes: Routes = [
  {
    path: '',
    component: MasterEditPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterEditPageRoutingModule {}
