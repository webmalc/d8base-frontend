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
import {LocationService} from '../../../services/location/location.service';
import {IpServicesHolderService} from '../../../services/location/ip-services-holder.service';
import {IpApiService} from '../../../services/location/ip-api.service';
import {IpDataService} from '../../../services/location/ip-data.service';
import {IpnfDataService} from '../../../services/location/ipnf-data.service';

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
