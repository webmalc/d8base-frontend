import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CertificateComponent } from '@app/master/components/certificate/certificate.component';
import { EducationComponent } from '@app/master/components/education/education.component';
import { ExperienceComponent } from '@app/master/components/experience/experience.component';
import { MasterProfileCalendarComponent } from '@app/master/components/master-profile-calendar/master-profile-calendar.component';
import { MasterProfileInfoComponent } from '@app/master/components/master-profile-info/master-profile-info.component';
import { MasterProfileMainInfoSectionComponent } from '@app/master/components/master-profile-main-info-section/master-profile-main-info-section.component';
import { MasterProfilePortfolioComponent } from '@app/master/components/master-profile-portfolio/master-profile-portfolio.component';
import { MasterProfileServiceEditComponent } from '@app/master/components/master-profile-service-edit/master-profile-service-edit.component';
import { MasterProfileServicePresentationComponent } from '@app/master/components/master-profile-service-presentation/master-profile-service-presentation.component';
import { MasterProfileServicesComponent } from '@app/master/components/master-profile-services/master-profile-services.component';
import { MasterProfileSubmenuComponent } from '@app/master/components/master-profile-submenu/master-profile-submenu.component';
import { CalendarGeneratorFactoryService } from '@app/master/services/calendar-generator-factory.service';
import { CertificatesApiService } from '@app/master/services/certificates-api.service';
import { EducationApiService } from '@app/master/services/education-api.service';
import { ExperienceApiService } from '@app/master/services/experience-api.service';
import { ReviewsModule } from '@app/reviews/reviews.module';
import { ServicesGeneratorFactoryService } from '@app/master/services/services-generator-factory.service';
import { ServicePageModule } from '@app/service/service.module';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MasterPageRoutingModule } from './master-routing.module';
import { MasterPage } from './master.page';
import { ProfessionalGuard } from './professional.guard';
import { ProfessionalContactEditComponent } from './components/professional-contact-edit/professional-contact-edit.component';

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
    MasterPage,
    MasterProfileInfoComponent,
    MasterProfileServicesComponent,
    MasterProfileCalendarComponent,
    MasterProfilePortfolioComponent,
    MasterProfileMainInfoSectionComponent,
    MasterProfileServicePresentationComponent,
    MasterProfileServiceEditComponent,
    MasterProfileSubmenuComponent,
    ExperienceComponent,
    EducationComponent,
    CertificateComponent,
    ProfessionalContactEditComponent,
  ],
  providers: [
    ExperienceApiService,
    EducationApiService,
    CertificatesApiService,
    CalendarGeneratorFactoryService,
    ServicesGeneratorFactoryService,
    ProfessionalGuard,
  ],
})
export class MasterPageModule {}
