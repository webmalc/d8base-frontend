import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CityPickerPopoverComponent } from '@app/auth/components/city-picker-popover/city-picker-popover.component';
import { RegistrationFormComponent } from '@app/auth/components/registration-form/registration-form.component';
import { RegistrationService } from '@app/auth/services/registration.service';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { IonicSelectableModule } from 'ionic-selectable';
import { RegistrationPageRoutingModule } from './registration-routing.module';
import { RegistrationPage } from './registration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    TranslateModule,
    IonicSelectableModule,
  ],
  declarations: [RegistrationPage, RegistrationFormComponent, CityPickerPopoverComponent],
  providers: [RegistrationService],
})
export class RegistrationPageModule {}
