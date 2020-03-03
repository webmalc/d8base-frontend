import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ProfilePageRoutingModule} from './profile-routing.module';

import {MainInfoTabComponent} from '@app/profile/components/main-info-tab/main-info-tab.component';
import {PluginsTabComponent} from '@app/profile/components/plugins-tab/plugins-tab.component';
import {SharedModule} from '@app/shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {ProfilePage} from './profile.page';
import {PluginApiService} from '@app/profile/services/plugin-api.service';
import {UserPluginApiService} from '@app/profile/services/user-plugin-api.service';

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
        PluginsTabComponent
    ],
    providers: [
        PluginApiService,
        UserPluginApiService
    ]
})
export class ProfilePageModule {
}
