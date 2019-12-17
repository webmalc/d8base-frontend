import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationPageRoutingModule } from './registration-routing.module';

import { RegistrationPage } from './registration.page';
import {SharedModule} from '../../../../../shared/shared.module';
import {RegistrationFormComponent} from '../../registration-form/registration-form.component';
import {TokenManagerService} from '../../../services/token-manager.service';
import {RegistrationFormService} from '../../../forms/registration-form.service';
import {RegistrationService} from '../../../services/registration.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [
    RegistrationPage,
    RegistrationFormComponent
  ],
  providers: [
    TokenManagerService,
    RegistrationFormService,
    RegistrationService
  ]
})
export class RegistrationPageModule {}
