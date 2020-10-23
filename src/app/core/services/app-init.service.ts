import {Injectable} from '@angular/core';
import {GlobalErrorHandlerService} from '@app/core/services/global-error-handler.service';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {TranslationService} from '@app/core/services/translation.service';
import {Platform} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AppInitService {

    constructor(
        private readonly translationService: TranslationService,
        private readonly platform: Platform,
        private readonly masterManager: MasterManagerService,
        private readonly errorHandler: GlobalErrorHandlerService
    ) {
    }

    public init(): Promise<any> {
        return new Promise<any>(resolve => {
            this.platform.ready().then(() => {
                this.translationService.init();
                resolve();
            }).catch(error => this.errorHandler.handleError(error));
        });
    }
}
