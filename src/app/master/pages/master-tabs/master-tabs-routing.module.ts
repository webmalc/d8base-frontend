import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CertificatesTabComponent} from '@app/master/components/certificates-tab/certificates-tab.component';
import {EducationTabComponent} from '@app/master/components/education-tab/education-tab.component';
import {ExperienceTabComponent} from '@app/master/components/experience-tab/experience-tab.component';
import {LocationTabComponent} from '@app/master/components/location-tab/location-tab.component';
import {TagsTabComponent} from '@app/master/components/tags-tab/tags-tab.component';
import {MasterTabsPage} from './master-tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: MasterTabsPage,
        data: {
            title: 'Professional'
        },
        children: [
            {
                path: 'tags',
                component: TagsTabComponent
            },
            {
                path: 'location',
                component: LocationTabComponent
            },
            {
                path: 'education',
                component: EducationTabComponent
            },
            {
                path: 'experience',
                component: ExperienceTabComponent
            },
            {
                path: 'certificates',
                component: CertificatesTabComponent
            }
        ]
    },
    {
        path: '',
        redirectTo: 'tabs/main',
        pathMatch: 'full',
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MasterTabsPageRoutingModule {
}
