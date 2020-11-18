import {Injectable} from '@angular/core';
import {AuthenticationService} from '@app/core/services/authentication.service';
import {GlobalErrorHandlerService} from '@app/core/services/global-error-handler.service';
import {TokenManagerService} from '@app/core/services/token-manager.service';
import {TranslationService} from '@app/core/services/translation.service';
import {Platform} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AppInitService {

    constructor(
        private readonly translationService: TranslationService,
        private readonly platform: Platform,
        private readonly errorHandler: GlobalErrorHandlerService,
        private readonly auth: AuthenticationService,
        private readonly tokenManager: TokenManagerService
    ) {
    }

    public init(): Promise<any> {
        return new Promise<any>(resolve => {
            this.platform.ready().then(() => {
                this.tokenManager.init();
                this.auth.init();
                this.translationService.init();
                resolve();
            }).catch(error => this.errorHandler.handleError(error));
        });
    }
}
