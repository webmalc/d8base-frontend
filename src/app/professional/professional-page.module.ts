import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CertificateComponent } from '@app/professional/components/certificate/certificate.component';
import { EducationComponent } from '@app/professional/components/education/education.component';
import { ExperienceComponent } from '@app/professional/components/experience/experience.component';
import { MasterProfileCalendarComponent } from '@app/professional/pages/master-profile-calendar/master-profile-calendar.component';
// eslint-disable-next-line max-len
import { MasterProfileServicesComponent } from '@app/professional/pages/service-list-page/master-profile-services/master-profile-services.component';
import { ServiceListPageComponent } from '@app/professional/pages/service-list-page/service-list-page.component';
import { CalendarGeneratorFactoryService } from '@app/professional/services/calendar-generator-factory.service';
import { ServicesGeneratorFactoryService } from '@app/professional/services/services-generator-factory.service';
import { ReviewsModule } from '@app/reviews/reviews.module';
import { ServicePageModule } from '@app/service/service.module';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ProfessionalContactEditComponent } from './pages/professional-contact-edit/professional-contact-edit.component';
import { ProfessionalCardLargeComponent } from './pages/professional-page/professional-card-large/professional-card-large.component';
import { ProfessionalPageComponent } from './pages/professional-page/professional-page.component';
// eslint-disable-next-line max-len
import { MasterProfileServiceEditComponent } from './pages/service-list-page/master-profile-services/master-profile-service-edit/master-profile-service-edit.component';
import { ServiceViewerComponent } from './pages/service-list-page/master-profile-services/service-viewer/service-viewer.component';
import { MasterPageRoutingModule } from './professional-page-routing.module';
import { ProfessionalGuard } from './professional.guard';
import { ProfessionalResolver } from './professional.resolver';

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
    MasterProfileServicesComponent,
    MasterProfileCalendarComponent,
    ServiceViewerComponent,
    MasterProfileServiceEditComponent,
    ExperienceComponent,
    EducationComponent,
    CertificateComponent,
    ProfessionalContactEditComponent,
    ServiceListPageComponent,
    ProfessionalCardLargeComponent,
  ],
  providers: [
    CalendarGeneratorFactoryService,
    ServicesGeneratorFactoryService,
    ProfessionalGuard,
    ProfessionalResolver,
  ],
})
export class ProfessionalPageModule {}
