import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationEditorModule } from '@app/shared/location-editor/location-editor.module';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { RegistrationService } from './services/registration.service';
import { RegistrationPageRoutingModule } from './registration-routing.module';
import { RegistrationPage } from './pages/registration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    TranslateModule,
    LocationEditorModule,
  ],
  declarations: [RegistrationPage, RegistrationFormComponent],
  providers: [RegistrationService],
})
export class RegistrationPageModule {}
