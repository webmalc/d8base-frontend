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
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TranslateModule } from '@ngx-translate/core';
import { StorageManagerMock } from './mocks';

let ionicModuleImported = false;
export const RootModules = () => {
  if (ionicModuleImported) {
    return [...ROOT_MODULES];
  }
  ionicModuleImported = true;
  return [IonicModule.forRoot(), ...ROOT_MODULES];
};

const ROOT_MODULES = [TranslateModule.forRoot(), StoreModule.forRoot()];

@NgModule({
  exports: [IonicModule, HttpClientTestingModule, RouterTestingModule, SharedModule, FormsModule, ReactiveFormsModule],
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
    SplashScreen,
    StatusBar,
  ],
})
export class ComponentTestingModule {}
