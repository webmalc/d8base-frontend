import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
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
import { IntervalService } from '@app/core/services/interval.service';
import { of } from 'rxjs';
import { CoreModule } from '@app/core/core.module';
import { ActivatedRoute } from '@angular/router';

let ionicModuleImported = false;
export const RootModules = () => {
  if (ionicModuleImported) {
    return [...ROOT_MODULES];
  }
  ionicModuleImported = true;
  return [IonicModule.forRoot(), ...ROOT_MODULES];
};

const ROOT_MODULES = [TranslateModule.forRoot(), StoreModule.forRoot(), CoreModule];

@NgModule({
  exports: [IonicModule, HttpClientTestingModule, RouterTestingModule, SharedModule, FormsModule, ReactiveFormsModule],
  providers: [
    // mocks:
    { provide: Storage, useClass: StorageManagerMock },
    {
      provide: IntervalService,
      useValue: {
        ticks: () => of(void 0),
      },
    },
    {
      provide: ActivatedRoute,
      useValue: {
        paramMap: of({
          get: () => '1',
        }),
        queryParamMap: of({
          has: () => false,
        }),
        params: of({}),
        queryParams: of({}),
        data: of({}),
        snapshot: of({}),
      },
    },

    // Location service deps:
    Geolocation,
    LocationAccuracy,
    SplashScreen,
    StatusBar,
  ],
})
export class ComponentTestingModule {}
