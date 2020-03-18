import {Component, OnInit} from '@angular/core';

import {Title} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {DarkModeService} from '@app/core/services/dark-mode.service';
import {TranslationService} from '@app/core/services/translation.service';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {MenuController, Platform} from '@ionic/angular';
import {filter, map} from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

    public darkTheme = false;

    constructor(
        private readonly platform: Platform,
        private readonly splashScreen: SplashScreen,
        private readonly statusBar: StatusBar,
        private readonly darkModeService: DarkModeService,
        private readonly titleService: Title,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        public readonly trans: TranslationService,
        public readonly menu: MenuController
    ) {
        this.initializeApp();
    }

// https://blog.bitsrc.io/dynamic-page-titles-in-angular-98ce20b5c334
    public ngOnInit(): void {
        const appTitle = this.titleService.getTitle();
        this.router
            .events.pipe(
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
        ).subscribe((title: string) => {
            this.titleService.setTitle(title);
        })
        ;
    }

    public initializeApp(): void {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.initDarkMode();
        });
    }

    public changeMode(data: any): void {
        this.darkTheme = data.target.checked;
        this.darkModeService.setMode(data.target.checked);
    }

    public getTitle(): string {
        return this.titleService.getTitle();
    }

    private initDarkMode(): void {
        this.darkModeService.isDarkMode().then((data: boolean) => {
            this.darkTheme = data;
        });
    }
}
