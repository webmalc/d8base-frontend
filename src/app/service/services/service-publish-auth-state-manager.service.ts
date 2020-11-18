import {Injectable} from '@angular/core';
import {Master} from '@app/core/models/master';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {ServicePublishSteps} from '@app/service/enums/service-publish-steps';
import {StepFourDataInterface} from '@app/service/interfaces/step-four-data-interface';
import {ServicePublishDataHolderService} from '@app/service/services/service-publish-data-holder.service';

@Injectable()
export class ServicePublishAuthStateManagerService {

    constructor(
        private readonly masterManager: MasterManagerService,
        private readonly userManager: UserManagerService,
        private readonly servicePublishDataHolder: ServicePublishDataHolderService
    ) {
    }

    public updateFourStepState(): void {
        if (!this.servicePublishDataHolder.isset(ServicePublishSteps.Four)) {
            this.masterManager.isMaster().subscribe(
                isMaster => isMaster ? this.masterManager.getMasterList().subscribe(
                    masterList => this.update((masterList as Master[]).length === 0)
                ) : this.update(true)
            );
        }
    }

    private update(isNewMaster: boolean): void {
        this.userManager.getCurrentUser().subscribe(
            user => this.servicePublishDataHolder.setStepData<StepFourDataInterface>(
                ServicePublishSteps.Four,
                {isNewMaster, user, isNewUser: false}
            )
        );
    }
}
