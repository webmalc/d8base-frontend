import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {IonicStorageModule} from '@ionic/storage';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeadersInterceptor} from '@app/core/services/headers-interceptor.service';
import {AuthInterceptor} from '@app/core/services/auth-interceptor.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslationService} from '@app/core/services/translation.service';
import {AppInitService} from '@app/core/services/app-init.service';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {GeolocationService} from '@app/core/proxies/geolocation.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {LocationService} from '@app/core/services/location/location.service';
import {IpServicesHolderService} from '@app/core/services/location/ip-services-holder.service';
import {IpApiService} from '@app/core/services/location/ip-api.service';
import {IpDataService} from '@app/core/services/location/ip-data.service';
import {IpnfDataService} from '@app/core/services/location/ipnf-data.service';
import {LocationAccuracy} from '@ionic-native/location-accuracy/ngx';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot({animated: false}),
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
        })
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: (initService: AppInitService) => () => initService.init(),
            multi: true,
            deps: [AppInitService]
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
        Geolocation,
        GeolocationService,
        LocationService,
        IpServicesHolderService,
        IpApiService,
        IpDataService,
        IpnfDataService,
        {
            provide: LocationAccuracy,
            useValue: window.hasOwnProperty('cordova') ? LocationAccuracy : {request: () => Promise.resolve(true), canRequest: () => Promise.resolve()}
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
