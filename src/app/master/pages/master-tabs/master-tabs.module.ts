import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CertificatesTabComponent} from '@app/master/components/certificates-tab/certificates-tab.component';
import {ContactsTabComponent} from '@app/master/components/contacts-tab/contacts-tab.component';
import {EditMasterComponent} from '@app/master/components/edit-master/edit-master.component';
import {EducationTabComponent} from '@app/master/components/education-tab/education-tab.component';
import {ExperienceTabComponent} from '@app/master/components/experience-tab/experience-tab.component';
import {LocationTabComponent} from '@app/master/components/location-tab/location-tab.component';
import {TagsSelectInputComponent} from '@app/master/components/tags-select-input/tags-select-input.component';
import {TagsTabComponent} from '@app/master/components/tags-tab/tags-tab.component';
import {CertificatesFormService} from '@app/master/forms/certificates-form.service';
import {EditMasterFormService} from '@app/master/forms/edit-master-form.service';
import {EducationFormService} from '@app/master/forms/education-form.service';
import {ExperienceFormService} from '@app/master/forms/experience-form.service';
import {CertificatesApiService} from '@app/master/services/certificates-api.service';
import {EducationApiService} from '@app/master/services/education-api.service';
import {ExperienceApiService} from '@app/master/services/experience-api.service';
import {UserContactApiService} from '@app/profile/services/user-contact-api.service';
import {SharedModule} from '@app/shared/shared.module';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {MasterTabsPageRoutingModule} from './master-tabs-routing.module';
import {MasterTabsPage} from './master-tabs.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MasterTabsPageRoutingModule,
        TranslateModule,
        ReactiveFormsModule,
        SharedModule,
    ],
    declarations: [
        MasterTabsPage,
        EditMasterComponent,
        TagsTabComponent,
        TagsSelectInputComponent,
        ContactsTabComponent,
        LocationTabComponent,
        EducationTabComponent,
        ExperienceTabComponent,
        CertificatesTabComponent
    ],
    providers: [
        EditMasterFormService,
        UserContactApiService,
        ExperienceApiService,
        EducationApiService,
        EducationFormService,
        ExperienceFormService,
        CertificatesApiService,
        CertificatesFormService
    ]
})
export class MasterTabsPageModule {
}
