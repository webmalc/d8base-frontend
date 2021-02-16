import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslationService } from '@app/core/services';
import { DarkModeService } from '@app/core/services/dark-mode.service';
import { FcmDeviceService } from '@app/core/services/fcm-device.service';
import { MasterManagerService } from '@app/core/services/master-manager.service';
import { NotificationWorkerService } from '@app/core/services/notification-worker.service';
import { UserManagerService } from '@app/core/services/user-manager.service';
import { environment } from '@env/environment';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AuthenticationService } from './core/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  public isAuthenticated$: Observable<boolean>;
  public darkTheme$: Observable<boolean>;

  constructor(
    public readonly masterManager: MasterManagerService,
    private readonly platform: Platform,
    private readonly splashScreen: SplashScreen,
    private readonly statusBar: StatusBar,
    darkModeService: DarkModeService,
    private readonly titleService: Title,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    authenticator: AuthenticationService,
    private readonly notificationWorker: NotificationWorkerService,
    private readonly fcmDevice: FcmDeviceService,
    private readonly userManager: UserManagerService,
    private readonly translationService: TranslationService, // TODO has to be instantiated
  ) {
    this.darkTheme$ = darkModeService.darkTheme$;
    this.isAuthenticated$ = authenticator.isAuthenticated$;
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
      }),
    ).subscribe((title: string) => this.titleService.setTitle(title));
  }

  public initializeApp(): void {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  public ngAfterViewInit(): void {
    this.platform.ready().then(async () => {
      await this.notificationWorker.init();
      await this.notificationWorker.requestPermission();
      this.fcmDevice.subscribeToAuth();
    });
  }
}
