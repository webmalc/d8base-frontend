import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ProfilePageRoutingModule} from './profile-routing.module';

import {ContactTabComponent} from '@app/profile/components/contact-tab/contact-tab.component';
import {EducationTabComponent} from '@app/profile/components/education-tab/education-tab.component';
import {MainInfoTabComponent} from '@app/profile/components/main-info-tab/main-info-tab.component';
import {PluginsTabComponent} from '@app/profile/components/plugins-tab/plugins-tab.component';
import {ContactFormService} from '@app/profile/forms/contact-form.service';
import {PluginsFormService} from '@app/profile/forms/plugins-form.service';
import {ContactApiService} from '@app/profile/services/contact-api.service';
import {PluginApiService} from '@app/profile/services/plugin-api.service';
import {ProfileService} from '@app/profile/services/profile.service';
import {UserPluginApiService} from '@app/profile/services/user-plugin-api.service';
import {SharedModule} from '@app/shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {ProfilePage} from './profile.page';
import {EducationApiService} from '@app/profile/services/education-api.service';
import {EducationFormService} from '@app/profile/forms/education-form.service';
import {CertificateApiService} from '@app/profile/services/certificate-api.service';

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
        EducationTabComponent
    ],
    providers: [
        PluginApiService,
        UserPluginApiService,
        PluginsFormService,
        ProfileService,
        ContactFormService,
        ContactApiService,
        EducationFormService,
        EducationApiService,
        CertificateApiService
    ]
})
export class ProfilePageModule {
}
