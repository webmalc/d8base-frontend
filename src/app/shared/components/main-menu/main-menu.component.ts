import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationFactory, DarkModeService, MasterManagerService, TranslationService} from '@app/core/services';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent {
    public darkTheme$: Observable<boolean>;
    public newMessages: boolean = false;

    constructor(
        public readonly trans: TranslationService,
        public readonly authenticationFactory: AuthenticationFactory,
        public readonly masterManager: MasterManagerService,
        private readonly router: Router,
        readonly darkModeService: DarkModeService
    ) {
        this.darkTheme$ = darkModeService.darkTheme$;
    }

    public changeMode(event: CustomEvent): void {
        const toggle = event.target as HTMLIonToggleElement;
        this.darkModeService.setMode(toggle.checked);
    }

    public logout(): void {
        this.authenticationFactory.getAuthenticator().logout().subscribe(() => {
            this.masterManager.updateIsMaster();
            this.router.navigateByUrl('/auth/login');
        });
    }

}
