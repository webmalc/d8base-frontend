import {Injectable} from '@angular/core';
import {ServicePublishStepFiveComponent} from '@app/service/components/service-publish-step-five/service-publish-step-five.component';
import {ServicePublishStepFourComponent} from '@app/service/components/service-publish-step-four/service-publish-step-four.component';
import {StepFourDataInterface} from '@app/service/interfaces/step-four-data-interface';
import {ServicePublishDataHolderService} from '@app/service/services/service-publish-data-holder.service';
import {AbstractHandler} from '@app/service/services/steps-navigation-chain/abstract-handler';

@Injectable()
export class StepFiveHandlerService extends AbstractHandler {

    constructor(private servicePublishDataHolderService: ServicePublishDataHolderService) {
        super();
    }

    public handle(): number {
        if (this.servicePublishDataHolderService.isset(ServicePublishStepFourComponent.STEP) &&
            !this.servicePublishDataHolderService.getStepData<StepFourDataInterface>(ServicePublishStepFourComponent.STEP).isNewMaster &&
            this.servicePublishDataHolderService.getStepData<StepFourDataInterface>(ServicePublishStepFourComponent.STEP).user) {
            return super.handle();
        }

        return this.getIndex();
    }

    protected getIndex(): number {
        return ServicePublishStepFiveComponent.STEP;
    }
}
