import {Injectable} from '@angular/core';
import {AuthenticationService} from '@app/core/services/authentication.service';
import {GlobalErrorHandlerService} from '@app/core/services/global-error-handler.service';
import {TokenManagerService} from '@app/core/services/token-manager.service';
import {TranslationService} from '@app/core/services/translation.service';
import {UserSettingsService} from '@app/shared/services/user-settings.service';
import {Platform} from '@ionic/angular';

@Injectable({
    providedIn: 'root',
})
export class AppInitService {

    constructor(
        private readonly translationService: TranslationService,
        private readonly platform: Platform,
        private readonly errorHandler: GlobalErrorHandlerService,
        private readonly auth: AuthenticationService,
        private readonly tokenManager: TokenManagerService,
        private readonly userSettings: UserSettingsService,
    ) {
    }

    public init(): Promise<any> {
        return new Promise<any>(resolve => {
            this.platform.ready().then(async () => {
                this.tokenManager.init();
                Promise.all([
                    this.auth.init(),
                    this.userSettings.init(),
                ]).catch(error => this.errorHandler.handleError(error)).finally(() => resolve());
                this.translationService.init();
            }).catch(error => this.errorHandler.handleError(error)).finally(() => resolve());
        });
    }
}
