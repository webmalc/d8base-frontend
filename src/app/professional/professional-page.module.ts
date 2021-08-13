import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CertificateComponent } from '@app/professional/components/certificate/certificate.component';
import { EducationComponent } from '@app/professional/components/education/education.component';
import { ExperienceComponent } from '@app/professional/components/experience/experience.component';
import { MasterProfileCalendarComponent } from '@app/professional/components/master-profile-calendar/master-profile-calendar.component';
import { MasterProfileInfoComponent } from '@app/professional/components/master-profile-info/master-profile-info.component';
import { MasterProfileServicesComponent } from '@app/professional/components/master-profile-services/master-profile-services.component';
import { MasterProfileSubmenuComponent } from '@app/professional/components/master-profile-submenu/master-profile-submenu.component';
import { ServiceListPageComponent } from '@app/professional/pages/service-list-page/service-list-page.component';
import { CalendarGeneratorFactoryService } from '@app/professional/services/calendar-generator-factory.service';
import { CertificatesApiService } from '@app/professional/services/certificates-api.service';
import { EducationApiService } from '@app/professional/services/education-api.service';
import { ExperienceApiService } from '@app/professional/services/experience-api.service';
import { MasterApiService } from '@app/professional/services/master-api.service';
import { ServicesGeneratorFactoryService } from '@app/professional/services/services-generator-factory.service';
import { ReviewsModule } from '@app/reviews/reviews.module';
import { ServicePageModule } from '@app/service/service.module';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MasterProfileMainInfoSectionComponent } from './components';
// eslint-disable-next-line max-len
import { MasterProfileServiceEditComponent } from './components/master-profile-services/master-profile-service-edit/master-profile-service-edit.component';
import { ServiceViewerComponent } from './components/master-profile-services/service-viewer/service-viewer.component';
import { ProfessionalContactEditComponent } from './components/professional-contact-edit/professional-contact-edit.component';
import { MasterPageRoutingModule } from './professional-page-routing.module';
import { ProfessionalPageComponent } from './professional-page.component';
import { ProfessionalGuard } from './professional.guard';
import { ProfessionalResolver } from './professional.resolver';
import { ProfessionalPhotosEditorService } from './services/professional-photos-editor.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasterPageRoutingModule,
    ReactiveFormsModule,
    ReviewsModule,
    SharedModule,
    ServicePageModule,
    TranslateModule,
  ],
  declarations: [
    ProfessionalPageComponent,
    MasterProfileInfoComponent,
    MasterProfileServicesComponent,
    MasterProfileCalendarComponent,
    MasterProfileMainInfoSectionComponent,
    ServiceViewerComponent,
    MasterProfileServiceEditComponent,
    MasterProfileSubmenuComponent,
    ExperienceComponent,
    EducationComponent,
    CertificateComponent,
    ProfessionalContactEditComponent,
    ServiceListPageComponent,
  ],
  providers: [
    MasterApiService,
    ExperienceApiService,
    EducationApiService,
    CertificatesApiService,
    CalendarGeneratorFactoryService,
    ServicesGeneratorFactoryService,
    ProfessionalGuard,
    ProfessionalResolver,
  ],
})
export class ProfessionalPageModule {}
