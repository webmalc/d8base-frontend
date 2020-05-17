import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ContactsTabComponent} from '@app/master/components/contacts-tab/contacts-tab.component';
import {EditMasterComponent} from '@app/master/components/edit-master/edit-master.component';
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
                path: 'main',
                component: EditMasterComponent
            },
            {
                path: 'tags',
                component: TagsTabComponent
            },
            {
                path: 'contacts',
                component: ContactsTabComponent
            },
            {
                path: 'location',
                component: LocationTabComponent
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
