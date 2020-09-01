import {Injectable} from '@angular/core';
import {AuthenticationService} from '@app/core/services/authentication.service';
import {GlobalErrorHandlerService} from '@app/core/services/global-error-handler.service';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {TranslationService} from '@app/core/services/translation.service';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {Platform} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AppInitService {

    constructor(
        private translationService: TranslationService,
        private platform: Platform,
        private masterManager: MasterManagerService,
        private errorHandler: GlobalErrorHandlerService,
        private auth: AuthenticationService,
        private userManager: UserManagerService
    ) {
    }

    /** TODO: Why code duplicate? */
    /** @see AppComponent.initializeApp */
    public init(): Promise<any> {
        return new Promise<any>(resolve => {
            this.platform.ready().then(() => {
                this.auth.isAuthenticated().subscribe(
                    isAuth => {
                        if (isAuth) {
                            this.masterManager.updateIsMaster();
                        } else {
                            this.masterManager.isMaster$.next(false);
                        }
                    }
                );
                this.userManager.subscribeToAuthSubject();
                this.translationService.init();
                resolve();
            }).catch(error => this.errorHandler.handleError(error));
        });
    }
}
