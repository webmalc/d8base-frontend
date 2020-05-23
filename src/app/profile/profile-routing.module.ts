import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookmarksTabComponent} from '@app/profile/components/bookmarks-tab/bookmarks-tab.component';
import {ContactTabComponent} from '@app/profile/components/contact-tab/contact-tab.component';
import {LocationTabComponent} from '@app/profile/components/location-tab/location-tab.component';
import {MainInfoTabComponent} from '@app/profile/components/main-info-tab/main-info-tab.component';
import {PluginsTabComponent} from '@app/profile/components/plugins-tab/plugins-tab.component';
import {SettingsTabComponent} from '@app/profile/components/settings-tab/settings-tab.component';
import {ProfilePage} from './profile.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: ProfilePage,
        data: {
            title: 'Profile'
        },
        children: [
            {
                path: 'main',
                component: MainInfoTabComponent
            },
            {
                path: 'plugins',
                component: PluginsTabComponent
            },
            {
                path: 'contacts',
                component: ContactTabComponent
            },
            {
                path: 'settings',
                component: SettingsTabComponent
            },
            {
                path: 'location',
                component: LocationTabComponent
            },
            {
                path: 'bookmark',
                component: BookmarksTabComponent
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
export class ProfilePageRoutingModule {
}
