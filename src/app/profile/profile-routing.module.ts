import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainGuard } from '@app/core/guards/main.guard';
import { AboutEditComponent } from '@app/profile/components/about-edit/about-edit.component';
import { UserEditComponent } from '@app/profile/components/user-edit/user-edit.component';
import { ProfilePage } from '@app/profile/profile.page';
import { UserContactEditComponent } from '@app/shared/components/user-contact-edit/user-contact-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    canActivate: [MainGuard],
  },
  {
    path: 'contact-edit/:contact-id',
    component: UserContactEditComponent,
    canActivate: [MainGuard],
    data: { isMaster: false },
  },
  {
    path: 'contact-add',
    component: UserContactEditComponent,
    canActivate: [MainGuard],
    data: { isMaster: false },
  },
  {
    path: 'contact-add-default/:default-contact-id',
    component: UserContactEditComponent,
    canActivate: [MainGuard],
    data: { isMaster: false },
  },
  {
    path: 'location-edit/:location-id',
    loadChildren: () => import('./pages/user-location-edit/user-location-edit.module').then(m => m.UserLocationEditPageModule),
    canActivate: [MainGuard],
  },
  {
    path: 'location-add',
    loadChildren: () => import('./pages/user-location-edit/user-location-edit.module').then(m => m.UserLocationEditPageModule),
    canActivate: [MainGuard],
  },
  {
    path: 'edit',
    component: UserEditComponent,
    canActivate: [MainGuard],
  },
  {
    path: 'about',
    component: AboutEditComponent,
    canActivate: [MainGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {
}
