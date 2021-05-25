import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MasterCertificateEditPage } from './master-certificate-edit.page';

const routes: Routes = [
  {
    path: '',
    component: MasterCertificateEditPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterCertificateEditPageRoutingModule {}
