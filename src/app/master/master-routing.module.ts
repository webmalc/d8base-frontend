import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainGuard} from '@app/core/guards/main.guard';
import {EditMasterComponent} from '@app/master/components/edit-master/edit-master.component';
import {UserContactEditComponent} from '@app/profile/components/user-contact-edit/user-contact-edit.component';
import {MasterPage} from './master.page';

// tslint:disable:max-line-length
const routes: Routes = [
    {
        path: '',
        component: MasterPage,
        pathMatch: 'full'
    },
    {
        path: 'add',
        component: EditMasterComponent
    },
    {
        path: 'edit/:id',
        loadChildren: () => import('./pages/master-tabs/master-tabs.module').then(m => m.MasterTabsPageModule)
    },
    {
        path: 'location-add',
        loadChildren: () => import('./pages/master-location-edit/master-location-edit.module').then(m => m.MasterLocationEditPageModule)
    },
    {
        path: 'location-edit/:location-id',
        loadChildren: () => import('./pages/master-location-edit/master-location-edit.module').then(m => m.MasterLocationEditPageModule)
    },
    {
        path: 'experience-edit/:experience-id',
        loadChildren: () => import('./pages/master-experience-edit/master-experience-edit.module').then(m => m.MasterExperienceEditPageModule)
    },
    {
        path: 'experience-add',
        loadChildren: () => import('./pages/master-experience-edit/master-experience-edit.module').then(m => m.MasterExperienceEditPageModule)
    },
    {
        path: 'education-add',
        loadChildren: () => import('./pages/master-education-edit/master-education-edit.module').then(m => m.MasterEducationEditPageModule)
    },
    {
        path: 'education-edit/:education-id',
        loadChildren: () => import('./pages/master-education-edit/master-education-edit.module').then(m => m.MasterEducationEditPageModule)
    },
    {
        path: 'certificate-add',
        loadChildren: () => import('./pages/master-certificate-edit/master-certificate-edit.module').then(m => m.MasterCertificateEditPageModule)
    },
    {
        path: 'certificate-edit/:certificate-id',
        loadChildren: () => import('./pages/master-certificate-edit/master-certificate-edit.module').then(m => m.MasterCertificateEditPageModule)
    },
    {
        path: 'tags-edit',
        loadChildren: () => import('./pages/master-tag-edit/master-tag-edit.module').then(m => m.MasterTagEditPageModule)
    },
    {
        path: 'professional-contact-add-default/:default-contact-id',
        component: UserContactEditComponent,
        data: {isMaster: true}
    },
    {
        path: 'professional-contact-edit/:contact-id',
        component: UserContactEditComponent,
        canActivate: [MainGuard],
        data: {isMaster: true}
    },
    {
        path: 'professional-contact-add',
        component: UserContactEditComponent,
        canActivate: [MainGuard],
        data: {isMaster: true}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MasterPageRoutingModule {
}
