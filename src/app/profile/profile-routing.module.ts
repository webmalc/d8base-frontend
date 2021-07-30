import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MustBeAuthorizedGuard } from '@app/core/services/guards/must-be-authorized.guard';
import { AboutEditComponent } from '@app/profile/components/about-edit/about-edit.component';
import { UserEditComponent } from '@app/profile/components/user-edit/user-edit.component';
import { ProfilePage } from '@app/profile/profile.page';
import { ProfileResolver } from '@app/profile/profile.resolver';
import { ChangeEmailComponent } from './components/change-email/change-email.component';
import { UserContactEditComponent } from './components/user-contact-edit/user-contact-edit.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [MustBeAuthorizedGuard],
    resolve: {
      profile: ProfileResolver,
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ProfilePage,
        canActivate: [MustBeAuthorizedGuard],
      },
      {
        path: 'contact-edit/:contact-id',
        component: UserContactEditComponent,
        canActivate: [MustBeAuthorizedGuard],
      },
      {
        path: 'contact-add',
        component: UserContactEditComponent,
        canActivate: [MustBeAuthorizedGuard],
      },
      {
        path: 'contact-add-default/:default-contact-id',
        component: UserContactEditComponent,
        canActivate: [MustBeAuthorizedGuard],
      },
      {
        path: 'location-edit/:location-id',
        loadChildren: () =>
          import('./pages/user-location-edit/user-location-edit.module').then(m => m.UserLocationEditPageModule),
        canActivate: [MustBeAuthorizedGuard],
      },
      {
        path: 'location-add',
        loadChildren: () =>
          import('./pages/user-location-edit/user-location-edit.module').then(m => m.UserLocationEditPageModule),
        canActivate: [MustBeAuthorizedGuard],
      },
      {
        path: 'edit',
        component: UserEditComponent,
        canActivate: [MustBeAuthorizedGuard],
      },
      {
        path: 'about',
        component: AboutEditComponent,
        canActivate: [MustBeAuthorizedGuard],
      },
      {
        path: 'change-email',
        component: ChangeEmailComponent,
        canActivate: [MustBeAuthorizedGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
