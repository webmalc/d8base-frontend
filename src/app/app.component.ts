import {Component, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {DarkModeService} from '@app/core/services/dark-mode.service';
import {Title} from '@angular/platform-browser';
import {NavigationEnd, Router, ActivatedRoute} from '@angular/router';
import {filter, map} from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

    public darkTheme = false;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private darkModeService: DarkModeService,
        private titleService: Title,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.initializeApp();
        this.initDarkMode();
    }
// https://blog.bitsrc.io/dynamic-page-titles-in-angular-98ce20b5c334
    ngOnInit(): void {
        const appTitle = this.titleService.getTitle();
        this.router
            .events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(_ => {
              let child = this.activatedRoute.firstChild;
              while (child.firstChild) {
                child = child.firstChild;
              }
              const titleName = 'title';
              if (child.snapshot.data[titleName]) {
                return child.snapshot.data[titleName];
              }

              return appTitle;
            })
        ).subscribe((title: string) => {
          this.titleService.setTitle(title);
        })
        ;
    }


    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    private initDarkMode() {
        this.darkModeService.isDarkMode().then((data: boolean) => {
            this.darkTheme = data;
        });
    }

    public changeMode(data: any) {
        this.darkTheme = data.target.checked;
        this.darkModeService.setMode(data.target.checked);
    }

    public getTitle() {
        return this.titleService.getTitle();
    }
}
