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
        private translationService: TranslationService,
        private platform: Platform,
        private masterManager: MasterManagerService,
        private errorHandler: GlobalErrorHandlerService
    ) {
    }

    public init(): Promise<any> {
        return new Promise<any>(resolve => {
            this.platform.ready().then(() => {
                this.translationService.init();
                this.masterManager.updateIsMaster();
                resolve();
            }).catch(error => this.errorHandler.handleError(error));
        });
    }
}
