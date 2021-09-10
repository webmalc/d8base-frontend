import { registerLocaleData } from '@angular/common';
import localeCanada from '@angular/common/locales/en-CA';
import localeRussia from '@angular/common/locales/ru';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { Router, RouteReuseStrategy } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { ErrorHandlingModule } from '@app/core/error-handling/error-handling.module';
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

import { ApiModule } from './api/api.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from './store/store.module';

registerLocaleData(localeRussia, 'ru');
registerLocaleData(localeCanada, 'en-CA');

@NgModule({
  declarations: [AppComponent],
  imports: [
    IonicModule.forRoot({
      mode: 'md', // TODO change to "ios" eventually
    }),
    IonicStorageModule.forRoot(),
    StoreModule.forRoot(),
    LeafletModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: JsonTranslateLoader,
      },
      defaultLanguage: environment.default_lang,
    }),
    ApiModule.forRoot({ rootUrl: `${environment.backend.url}/api` }),
    BrowserModule,
    CoreModule,
    ErrorHandlingModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Title,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    Geolocation,
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
    {
      provide: LOCALE_ID,
      useValue: 'en-CA',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
