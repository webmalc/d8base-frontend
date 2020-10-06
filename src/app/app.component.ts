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
import {Country} from '@app/profile/models/country';
import {firebase} from '@firebase/app';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {MenuController, Platform} from '@ionic/angular';
import {Observable, of} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';
import {environment} from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

    public darkTheme = false;
    public newMessages: boolean = false;
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
        public readonly menu: MenuController,
        public readonly authenticationFactory: AuthenticationFactory,
        public readonly masterManager: MasterManagerService,
        public readonly userLocationApi: UserLocationApiService,
        public readonly countryApi: CountriesApiService,
        private readonly notificationWorker: NotificationWorkerService,
        private readonly fcmDevice: FcmDeviceService,
        private readonly userManager: UserManagerService
    ) {
        this.initializeApp();
    }

// https://blog.bitsrc.io/dynamic-page-titles-in-angular-98ce20b5c334
    public ngOnInit(): void {
        firebase.initializeApp(environment.firebaseConfig);
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
        this.getDefaultUserCountry().pipe(filter(code => null !== code)).subscribe(c => this.countryCode = c.code.toLowerCase());

    }

    public initializeApp(): void {
        this.platform.ready().then(async () => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.initDarkMode();
            this.toggleMenu();
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

    public toggleMenu(): void {
        const splitPane = document.querySelector('ion-split-pane');
        const windowWidth = window.innerWidth;
        const splitPaneShownAt = 992;
        const menu = splitPane.querySelector('ion-menu');
        if (windowWidth >= splitPaneShownAt) {
            splitPane.disabled = !splitPane.disabled;
            menu.disabled = !menu.disabled;
        }
    }

    public becomeMaster(): void {
        this.masterManager.becomeMaster().subscribe();
    }

    public changeMode(data: any): void {
        this.darkTheme = data.target.checked;
        this.darkModeService.setMode(data.target.checked);
    }

    public getTitle(): string {
        return this.titleService.getTitle();
    }

    public async logout(): Promise<void> {
        await this.authenticationFactory.getAuthenticator().logout();
        this.masterManager.updateIsMaster();
        this.authenticationFactory.getAuthenticator().getIsAuthenticatedSubject().next(false);
        this.router.navigateByUrl('/auth/login');
    }

    private getDefaultUserCountry(): Observable<Country> {
        return this.authenticationFactory.getAuthenticator().isAuthenticated().pipe(
            filter(isAuth => isAuth === true),
            switchMap(isAuth => isAuth ? this.userLocationApi.getDefaultLocation().pipe(
                filter(location => location !== undefined),
                switchMap(location => this.countryApi.getByEntityId(location.country as number))
            ) : of(null))
        );
    }

    private initDarkMode(): void {
        this.darkModeService.isDarkMode().then((data: boolean) => this.darkTheme = data);
    }
}
