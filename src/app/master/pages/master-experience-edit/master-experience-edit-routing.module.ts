import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MasterExperienceEditPage} from './master-experience-edit.page';

const routes: Routes = [
  {
    path: '',
    component: MasterExperienceEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterExperienceEditPageRoutingModule {
}
