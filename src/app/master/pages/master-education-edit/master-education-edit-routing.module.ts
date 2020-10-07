import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MasterEducationEditPage} from './master-education-edit.page';

const routes: Routes = [
  {
    path: '',
    component: MasterEducationEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterEducationEditPageRoutingModule {
}
