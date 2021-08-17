import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBranch, NavParams } from '@app/core/constants/navigation.constants';
import { MustBeAuthorizedGuard } from '@app/core/services/guards/must-be-authorized.guard';
import { MasterProfileCalendarComponent } from '@app/professional/pages/master-profile-calendar/master-profile-calendar.component';
import { ServiceListPageComponent } from '@app/professional/pages/service-list-page/service-list-page.component';
import { ProfessionalResolver } from '@app/professional/professional.resolver';
import { ProfessionalContactEditComponent } from './pages/professional-contact-edit/professional-contact-edit.component';

import { ProfessionalPageComponent } from './pages/professional-page/professional-page.component';
import { ProfessionalGuard } from './professional.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: NavBranch.MyProfile,
  },
  {
    path: NavBranch.MyProfile,
    pathMatch: 'full',
    canActivate: [ProfessionalGuard],
  },
  {
    path: NavBranch.MyServices,
    pathMatch: 'full',
    canActivate: [ProfessionalGuard],
  },
  {
    path: NavBranch.MySchedule,
    pathMatch: 'full',
    canActivate: [ProfessionalGuard],
  },
  {
    path: `:${NavParams.MasterId}`,
    children: [
      {
        path: '',
        pathMatch: 'full',
        canActivate: [ProfessionalGuard],
      },
      {
        path: NavBranch.Services,
        component: ServiceListPageComponent,
        pathMatch: 'full',
        resolve: {
          context: ProfessionalResolver,
        },
      },
      {
        path: NavBranch.Schedule,
        component: MasterProfileCalendarComponent,
        pathMatch: 'full',
        resolve: {
          context: ProfessionalResolver,
        },
      },
      {
        path: NavBranch.Profile,
        children: [
          {
            path: '',
            component: ProfessionalPageComponent,
            pathMatch: 'full',
            resolve: {
              context: ProfessionalResolver,
            },
          },
          {
            path: 'add',
            loadChildren: () => import('./pages/master-edit/master-edit.module').then(m => m.MasterEditPageModule),
            pathMatch: 'full',
          },
          {
            path: 'edit',
            loadChildren: () => import('./pages/master-edit/master-edit.module').then(m => m.MasterEditPageModule),
            pathMatch: 'full',
          },
          {
            path: 'location-add',
            loadChildren: () =>
              import('./pages/master-location-edit/master-location-edit.module').then(
                m => m.MasterLocationEditPageModule,
              ),
            pathMatch: 'full',
          },
          {
            path: 'location-edit/:location-id',
            loadChildren: () =>
              import('./pages/master-location-edit/master-location-edit.module').then(
                m => m.MasterLocationEditPageModule,
              ),
            pathMatch: 'full',
          },
          {
            path: 'experience-edit/:experience-id',
            loadChildren: () =>
              import('./pages/master-experience-edit/master-experience-edit.module').then(
                m => m.MasterExperienceEditPageModule,
              ),
            pathMatch: 'full',
          },
          {
            path: 'experience-add',
            loadChildren: () =>
              import('./pages/master-experience-edit/master-experience-edit.module').then(
                m => m.MasterExperienceEditPageModule,
              ),
            pathMatch: 'full',
          },
          {
            path: 'education-add',
            loadChildren: () =>
              import('./pages/master-education-edit/master-education-edit.module').then(
                m => m.MasterEducationEditPageModule,
              ),
            pathMatch: 'full',
          },
          {
            path: 'education-edit/:education-id',
            loadChildren: () =>
              import('./pages/master-education-edit/master-education-edit.module').then(
                m => m.MasterEducationEditPageModule,
              ),
            pathMatch: 'full',
          },
          {
            path: 'certificate-add',
            loadChildren: () =>
              import('./pages/master-certificate-edit/master-certificate-edit.module').then(
                m => m.MasterCertificateEditPageModule,
              ),
            pathMatch: 'full',
          },
          {
            path: 'certificate-edit/:certificate-id',
            loadChildren: () =>
              import('./pages/master-certificate-edit/master-certificate-edit.module').then(
                m => m.MasterCertificateEditPageModule,
              ),
            pathMatch: 'full',
          },
          {
            path: 'professional-contact-add-default/:default-contact-id',
            component: ProfessionalContactEditComponent,
            canActivate: [MustBeAuthorizedGuard],
          },
          {
            path: 'professional-contact-edit/:contact-id',
            component: ProfessionalContactEditComponent,
            canActivate: [MustBeAuthorizedGuard],
          },
          {
            path: 'professional-contact-add',
            component: ProfessionalContactEditComponent,
            canActivate: [MustBeAuthorizedGuard],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterPageRoutingModule {}
