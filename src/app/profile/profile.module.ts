import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ProfilePageRoutingModule} from './profile-routing.module';

import {BookmarksItemComponent} from '@app/profile/components/bookmarks-tab/bookmarks-item/bookmarks-item.component';
import {BookmarksTabComponent} from '@app/profile/components/bookmarks-tab/bookmarks-tab.component';
import {ContactTabComponent} from '@app/profile/components/contact-tab/contact-tab.component';
import {LocationTabComponent} from '@app/profile/components/location-tab/location-tab.component';
import {MainInfoTabComponent} from '@app/profile/components/main-info-tab/main-info-tab.component';
import {PluginsTabComponent} from '@app/profile/components/plugins-tab/plugins-tab.component';
import {SettingsTabComponent} from '@app/profile/components/settings-tab/settings-tab.component';
import {PluginsFormService} from '@app/profile/forms/plugins-form.service';
import {SettingsFormService} from '@app/profile/forms/settings-form.service';
import {BookmarksService} from '@app/profile/services/bookmarks.service';
import {PluginApiService} from '@app/profile/services/plugin-api.service';
import {ProfileService} from '@app/profile/services/profile.service';
import {SavedProfessionalApiService} from '@app/profile/services/saved-professional-api.service';
import {UserContactApiService} from '@app/profile/services/user-contact-api.service';
import {UserPluginApiService} from '@app/profile/services/user-plugin-api.service';
import {SharedModule} from '@app/shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {ProfilePage} from './profile.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProfilePageRoutingModule,
        TranslateModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        ProfilePage,
        MainInfoTabComponent,
        PluginsTabComponent,
        ContactTabComponent,
        SettingsTabComponent,
        LocationTabComponent,
        BookmarksTabComponent,
        BookmarksItemComponent
    ],
    providers: [
        PluginApiService,
        UserPluginApiService,
        PluginsFormService,
        ProfileService,
        UserContactApiService,
        SettingsFormService,
        BookmarksService,
        SavedProfessionalApiService
    ]
})
export class ProfilePageModule {
}
