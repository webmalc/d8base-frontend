import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserLocationEditPage} from './user-location-edit.page';

const routes: Routes = [
  {
    path: '',
    component: UserLocationEditPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserLocationEditPageRoutingModule {
}
