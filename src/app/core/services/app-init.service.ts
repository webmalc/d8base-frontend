import {Injectable} from '@angular/core';
import {TranslationService} from '@app/core/services/translation.service';
import {Platform} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AppInitService {

    constructor(
        private translationService: TranslationService,
        private platform: Platform
    ) {
    }

    public init(): Promise<any> {
        return new Promise<any>(resolve => {
            this.platform.ready().then(() => {
                this.translationService.init();
                resolve();
            });
        });
    }
}
