import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ProfilePageRoutingModule} from './profile-routing.module';

import {MainInfoTabComponent} from '@app/profile/components/main-info-tab/main-info-tab.component';
import {PluginsTabComponent} from '@app/profile/components/plugins-tab/plugins-tab.component';
import {PluginsFormService} from '@app/profile/forms/plugins-form.service';
import {PluginApiService} from '@app/profile/services/plugin-api.service';
import {ProfileService} from '@app/profile/services/profile.service';
import {UserPluginApiService} from '@app/profile/services/user-plugin-api.service';
import {SharedModule} from '@app/shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {ProfilePage} from './profile.page';
import {ContactTabComponent} from '@app/profile/components/contact-tab/contact-tab.component';
import {ContactFormService} from '@app/profile/forms/contact-form.service';

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
        ContactTabComponent
    ],
    providers: [
        PluginApiService,
        UserPluginApiService,
        PluginsFormService,
        ProfileService,
        ContactFormService
    ]
})
export class ProfilePageModule {
}
