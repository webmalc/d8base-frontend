import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IpApiService } from '@app/core/services/location/ip-api.service';
import { IpDataService } from '@app/core/services/location/ip-data.service';
import { IpServicesHolderService } from '@app/core/services/location/ip-services-holder.service';
import { IpnfDataService } from '@app/core/services/location/ipnf-data.service';
import { SharedModule } from '@app/shared/shared.module';
import { StoreModule } from '@app/store/store.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
import { StorageManagerMock } from './mocks';

let ionicModuleImported = false;
export const RootModules = () => {
  if (ionicModuleImported) {
    return [...ROOT_MODULES];
  }
  ionicModuleImported = true;
  return [
    IonicModule.forRoot(),
    ...ROOT_MODULES
  ];
}

const ROOT_MODULES = [
  TranslateModule.forRoot(),
  StoreModule.forRoot(),
  NgxsModule.forRoot([])
];

@NgModule({
  exports: [
    IonicModule,
    HttpClientTestingModule,
    RouterTestingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    // mocks:
    { provide: Storage, useClass: StorageManagerMock },

    // Location service deps:
    IpServicesHolderService,
    IpApiService,
    IpDataService,
    IpnfDataService,
    Geolocation,
    LocationAccuracy,
  ],
})
export class ComponentTestingModule {
}
