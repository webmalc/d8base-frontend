import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ProfilePageRoutingModule} from './profile-routing.module';

import {ContactTabComponent} from '@app/profile/components/contact-tab/contact-tab.component';
import {EducationTabComponent} from '@app/profile/components/education-tab/education-tab.component';
import {LocationTabComponent} from '@app/profile/components/location-tab/location-tab.component';
import {MainInfoTabComponent} from '@app/profile/components/main-info-tab/main-info-tab.component';
import {PluginsTabComponent} from '@app/profile/components/plugins-tab/plugins-tab.component';
import {SettingsTabComponent} from '@app/profile/components/settings-tab/settings-tab.component';
import {EducationFormService} from '@app/profile/forms/education-form.service';
import {PluginsFormService} from '@app/profile/forms/plugins-form.service';
import {SettingsFormService} from '@app/profile/forms/settings-form.service';
import {CertificateApiService} from '@app/profile/services/certificate-api.service';
import {EducationApiService} from '@app/profile/services/education-api.service';
import {PluginApiService} from '@app/profile/services/plugin-api.service';
import {ProfileService} from '@app/profile/services/profile.service';
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
        EducationTabComponent,
        SettingsTabComponent,
        LocationTabComponent
    ],
    providers: [
        PluginApiService,
        UserPluginApiService,
        PluginsFormService,
        ProfileService,
        UserContactApiService,
        EducationFormService,
        EducationApiService,
        CertificateApiService,
        SettingsFormService
    ]
})
export class ProfilePageModule {
}
