import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AuthenticationFactory} from '@app/core/services/authentication-factory.service';
import {DarkModeService} from '@app/core/services/dark-mode.service';
import {FcmDeviceService} from '@app/core/services/fcm-device.service';
import {CountriesApiService} from '@app/core/services/location/countries-api.service';
import {UserLocationApiService} from '@app/core/services/location/user-location-api.service';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {NotificationWorkerService} from '@app/core/services/notification-worker.service';
import {TranslationService} from '@app/core/services/translation.service';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {environment} from '@env/environment';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Platform} from '@ionic/angular';
import firebase from 'firebase';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

    public darkTheme$: Observable<boolean>;
    public countryCode: string;

    constructor(
        public readonly platform: Platform,
        private readonly splashScreen: SplashScreen,
        private readonly statusBar: StatusBar,
        private readonly darkModeService: DarkModeService,
        private readonly titleService: Title,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        public readonly trans: TranslationService,
        public readonly authenticationFactory: AuthenticationFactory,
        public readonly masterManager: MasterManagerService,
        public readonly userLocationApi: UserLocationApiService,
        public readonly countryApi: CountriesApiService,
        private readonly notificationWorker: NotificationWorkerService,
        private readonly fcmDevice: FcmDeviceService,
        private readonly userManager: UserManagerService
    ) {
        this.darkTheme$ = darkModeService.darkTheme$;
        this.initializeApp();
    }

// https://blog.bitsrc.io/dynamic-page-titles-in-angular-98ce20b5c334
    public ngOnInit(): void {
        if (!firebase.apps.length) {
            firebase.initializeApp(environment.firebaseConfig);
        }
        const appTitle = this.titleService.getTitle();
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(_ => {
                let child = this.activatedRoute.firstChild;
                while (child.firstChild) {
                    child = child.firstChild;
                }
                if (child.snapshot.data.title) {
                    return child.snapshot.data.title;
                }

                return appTitle;
            })
        ).subscribe((title: string) => this.titleService.setTitle(title));
    }

    public initializeApp(): void {
        this.platform.ready().then(async () => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.userManager.subscribeToAuthSubject();
            this.masterManager.subscribeToAuth();
        });
    }

    public ngAfterViewInit(): void {
        this.platform.ready().then(async () => {
            await this.notificationWorker.init();
            await this.notificationWorker.requestPermission();
            this.fcmDevice.subscribeToAuth();
        });
    }

    public logout(): void {
        this.authenticationFactory.getAuthenticator().logout().subscribe(() => {
            this.masterManager.updateIsMaster();
            this.router.navigateByUrl('/auth/login');
        });
    }
}
