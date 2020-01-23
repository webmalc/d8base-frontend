import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
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

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
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
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
