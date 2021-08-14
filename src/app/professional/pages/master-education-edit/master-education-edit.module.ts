import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EducationEditComponent } from '@app/professional/pages/master-education-edit/education-edit/education-edit.component';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MasterEducationEditPageRoutingModule } from './master-education-edit-routing.module';
import { MasterEducationEditPage } from './master-education-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    MasterEducationEditPageRoutingModule,
    TranslateModule,
  ],
  declarations: [MasterEducationEditPage, EducationEditComponent],
})
export class MasterEducationEditPageModule {}
