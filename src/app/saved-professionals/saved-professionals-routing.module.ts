import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSavedProfessionalsListComponent } from './components/user-saved-professionals-list/user-saved-professionals.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UserSavedProfessionalsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedProfessionalsRoutingModule {}
