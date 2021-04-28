import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainGuard } from '@app/core/guards/main.guard';
import { AboutEditComponent } from '@app/profile/components/about-edit/about-edit.component';
import { UserEditComponent } from '@app/profile/components/user-edit/user-edit.component';
import { ProfilePage } from '@app/profile/profile.page';
import { ProfileResolver } from '@app/profile/profile.resolver';
import { ChangeEmailComponent } from './components/change-email/change-email.component';
import { UserContactEditComponent } from './components/user-contact-edit/user-contact-edit.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [MainGuard],
    resolve: {
      profile: ProfileResolver,
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ProfilePage,
        canActivate: [MainGuard],
      },
      {
        path: 'contact-edit/:contact-id',
        component: UserContactEditComponent,
        canActivate: [MainGuard],
      },
      {
        path: 'contact-add',
        component: UserContactEditComponent,
        canActivate: [MainGuard],
      },
      {
        path: 'contact-add-default/:default-contact-id',
        component: UserContactEditComponent,
        canActivate: [MainGuard],
      },
      {
        path: 'location-edit/:location-id',
        loadChildren: () =>
          import('./pages/user-location-edit/user-location-edit.module').then(m => m.UserLocationEditPageModule),
        canActivate: [MainGuard],
      },
      {
        path: 'location-add',
        loadChildren: () =>
          import('./pages/user-location-edit/user-location-edit.module').then(m => m.UserLocationEditPageModule),
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
      {
        path: 'change-email',
        component: ChangeEmailComponent,
        canActivate: [MainGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
