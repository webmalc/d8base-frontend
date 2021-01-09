import {Injectable} from '@angular/core';
import {ServicePublishDataHolderService} from '@app/service/services/service-publish-data-holder.service';

@Injectable({
    providedIn: 'root',
})
export class PreLogoutService {

    constructor(private readonly servicePublicationState: ServicePublishDataHolderService) {
    }

    public run(): Promise<any> {
        return Promise.all([
            this.servicePublicationState.reset(),
        ]);
    }
}
