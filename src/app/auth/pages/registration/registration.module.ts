import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationPageRoutingModule } from './registration-routing.module';

import { RegistrationPage } from './registration.page';
import {SharedModule} from '@app/shared/shared.module';
import {RegistrationFormComponent} from '@app/auth/components/registration-form/registration-form.component';
import {TokenManagerService} from '@app/auth/services/token-manager.service';
import {RegistrationFormService} from '@app/auth/forms/registration-form.service';
import {RegistrationService} from '@app/auth/services/registration.service';
import {LocationService} from '@app/auth/services/location/location.service';
import {IpServicesHolderService} from '@app/auth/services/location/ip-services-holder.service';
import {IpApiService} from '@app/auth/services/location/ip-api.service';
import {IpDataService} from '@app/auth/services/location/ip-data.service';
import {IpnfDataService} from '@app/auth/services/location/ipnf-data.service';

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
    RegistrationService,
    LocationService,
    IpServicesHolderService,
    IpApiService,
    IpDataService,
    IpnfDataService
  ]
})
export class RegistrationPageModule {}
