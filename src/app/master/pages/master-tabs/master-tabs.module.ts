import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CertificatesItemComponent} from '@app/master/components/certificates-item/certificates-item.component';
import {CertificatesListComponent} from '@app/master/components/certificates-list/certificates-list.component';
import {CertificatesTabComponent} from '@app/master/components/certificates-tab/certificates-tab.component';
import {ContactsTabComponent} from '@app/master/components/contacts-tab/contacts-tab.component';
import {EducationItemComponent} from '@app/master/components/education-item/education-item.component';
import {EducationListComponent} from '@app/master/components/education-list/education-list.component';
import {EducationTabComponent} from '@app/master/components/education-tab/education-tab.component';
import {ExperienceItemComponent} from '@app/master/components/experience-item/experience-item.component';
import {ExperienceListComponent} from '@app/master/components/experience-list/experience-list.component';
import {ExperienceTabComponent} from '@app/master/components/experience-tab/experience-tab.component';
import {LocationTabComponent} from '@app/master/components/location-tab/location-tab.component';
import {TagsTabComponent} from '@app/master/components/tags-tab/tags-tab.component';
import {CertificatesApiService} from '@app/master/services/certificates-api.service';
import {EducationApiService} from '@app/master/services/education-api.service';
import {ExperienceApiService} from '@app/master/services/experience-api.service';
import {TagsListApiService} from '@app/master/services/tags-list-api.service';
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
        TagsTabComponent,
        ContactsTabComponent,
        LocationTabComponent,
        EducationTabComponent,
        ExperienceTabComponent,
        CertificatesTabComponent,
        ExperienceItemComponent,
        ExperienceListComponent,
        EducationListComponent,
        EducationItemComponent,
        CertificatesListComponent,
        CertificatesItemComponent
    ],
    exports: [
    ],
    providers: [
        UserContactApiService,
        ExperienceApiService,
        EducationApiService,
        CertificatesApiService,
        TagsListApiService
    ]
})
export class MasterTabsPageModule {
}
