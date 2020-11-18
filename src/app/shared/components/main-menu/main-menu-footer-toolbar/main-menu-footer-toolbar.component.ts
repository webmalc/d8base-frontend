import {Component} from '@angular/core';
import {DarkModeService, TranslationService} from '@app/core/services';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-main-menu-footer-toolbar',
    templateUrl: './main-menu-footer-toolbar.component.html',
    styleUrls: ['./main-menu-footer-toolbar.component.scss']
})
export class MainMenuFooterToolbarComponent {
    public darkTheme$: Observable<boolean>;

    constructor(
        public readonly trans: TranslationService,
        private readonly darkModeService: DarkModeService
    ) {
        this.darkTheme$ = darkModeService.darkTheme$;
    }

    public changeMode(event: CustomEvent): void {
        const toggle = event.target as HTMLIonToggleElement;
        this.darkModeService.setMode(toggle.checked);
    }
}
