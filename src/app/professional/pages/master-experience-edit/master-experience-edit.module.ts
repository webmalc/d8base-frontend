import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExperienceEditComponent } from '@app/professional/components/experience-edit/experience-edit.component';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MasterExperienceEditPageRoutingModule } from './master-experience-edit-routing.module';
import { MasterExperienceEditPage } from './master-experience-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    MasterExperienceEditPageRoutingModule,
    TranslateModule,
  ],
  declarations: [MasterExperienceEditPage, ExperienceEditComponent],
})
export class MasterExperienceEditPageModule {}
