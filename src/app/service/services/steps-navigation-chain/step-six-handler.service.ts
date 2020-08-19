import {Injectable} from '@angular/core';
import {ServicePublishStepFourComponent} from '@app/service/components/service-publish-step-four/service-publish-step-four.component';
import {ServicePublishStepSixComponent} from '@app/service/components/service-publish-step-six/service-publish-step-six.component';
import {StepFourDataInterface} from '@app/service/interfaces/step-four-data-interface';
import {ServicePublishDataHolderService} from '@app/service/services/service-publish-data-holder.service';
import {AbstractHandler} from '@app/service/services/steps-navigation-chain/abstract-handler';

@Injectable()
export class StepSixHandlerService extends AbstractHandler {

    constructor(private servicePublishDataHolderService: ServicePublishDataHolderService) {
        super();
    }

    public handle(): number {
        if (this.servicePublishDataHolderService.isset(ServicePublishStepFourComponent.STEP) &&
            !this.servicePublishDataHolderService.getStepData<StepFourDataInterface>(ServicePublishStepFourComponent.STEP).isNewMaster) {
            return super.handle();
        }

        return this.getIndex();
    }

    protected getIndex(): number {
        return ServicePublishStepSixComponent.STEP;
    }
}
