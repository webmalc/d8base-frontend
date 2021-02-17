import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { Router, RouteReuseStrategy } from '@angular/router';
import { ErrorHandlingModule } from '@app/core/error-handling/error-handling.module';
import { GeolocationService } from '@app/core/proxies/geolocation.service';
import { AuthInterceptor } from '@app/core/services/auth-interceptor.service';
import { FcmDeviceService } from '@app/core/services/fcm-device.service';
import { HeadersInterceptor } from '@app/core/services/headers-interceptor.service';
import { LangInterceptorService } from '@app/core/services/lang-interceptor.service';
import { IpApiService } from '@app/core/services/location/ip-api.service';
import { IpDataService } from '@app/core/services/location/ip-data.service';
import { IpServicesHolderService } from '@app/core/services/location/ip-services-holder.service';
import { IpnfDataService } from '@app/core/services/location/ipnf-data.service';
import { LocationService } from '@app/core/services/location/location.service';
import { TimezoneInterceptor } from '@app/core/services/timezone-interceptor.service';
import { JsonTranslateLoader } from '@app/shared/services/json-translate-loader';
import { SharedModule } from '@app/shared/shared.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { environment } from '@env/environment';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import * as Sentry from '@sentry/angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { ApiModule } from './api/api.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from './store/store.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    StoreModule.forRoot(),
    LeafletModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: JsonTranslateLoader,
      },
      defaultLanguage: 'en',
    }),
    ApiModule.forRoot({ rootUrl: `${environment.backend.url}/api` }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    SharedModule,
    ErrorHandlingModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Title,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LangInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TimezoneInterceptor,
      multi: true,
    },
    Geolocation,
    GeolocationService,
    LocationService,
    IpServicesHolderService,
    IpApiService,
    IpDataService,
    IpnfDataService,
    FcmDeviceService,
    {
      provide: LocationAccuracy,
      useFactory: (platform: Platform) =>
        !platform.is('desktop')
          ? LocationAccuracy
          : {
            request: () => Promise.resolve(true),
            canRequest: () => Promise.resolve(),
          },
      deps: [Platform],
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
