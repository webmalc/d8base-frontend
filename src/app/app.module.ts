import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule, Title} from '@angular/platform-browser';
import {Router, RouteReuseStrategy} from '@angular/router';
import {GeolocationService} from '@app/core/proxies/geolocation.service';
import {AppInitService} from '@app/core/services/app-init.service';
import {AuthInterceptor} from '@app/core/services/auth-interceptor.service';
import {FcmDeviceService} from '@app/core/services/fcm-device.service';
import {GlobalErrorHandlerService} from '@app/core/services/global-error-handler.service';
import {HeadersInterceptor} from '@app/core/services/headers-interceptor.service';
import {IpApiService} from '@app/core/services/location/ip-api.service';
import {IpDataService} from '@app/core/services/location/ip-data.service';
import {IpServicesHolderService} from '@app/core/services/location/ip-services-holder.service';
import {IpnfDataService} from '@app/core/services/location/ipnf-data.service';
import {LocationService} from '@app/core/services/location/location.service';
import {TranslationService} from '@app/core/services/translation.service';
import {SharedModule} from '@app/shared/shared.module';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {LocationAccuracy} from '@ionic-native/location-accuracy/ngx';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {IonicModule, IonicRouteStrategy, Platform} from '@ionic/angular';
import {IonicStorageModule} from '@ionic/storage';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import * as Sentry from '@sentry/angular';
import {IonicSelectableModule} from 'ionic-selectable';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        IonicSelectableModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        LeafletModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (http: HttpClient) => new TranslateHttpLoader(http, TranslationService.DIR, TranslationService.SUFFIX),
                deps: [HttpClient]
            }
        }),
        SharedModule
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: (initService: AppInitService) => () => initService.init(),
            multi: true,
            deps: [AppInitService, Sentry.TraceService]
        },
        StatusBar,
        SplashScreen,
        Title,
        {
            provide: RouteReuseStrategy,
            useClass: IonicRouteStrategy
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HeadersInterceptor,
            multi: true
        },
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandlerService
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
            useFactory: (platform: Platform) => !platform.is('desktop') ? LocationAccuracy : {
                request: () => Promise.resolve(true),
                canRequest: () => Promise.resolve()
            },
            deps: [Platform]
        },
        {
            provide: Sentry.TraceService,
            deps: [Router]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
