import {Injectable} from '@angular/core';
import {ServicePublishStepFourComponent} from '@app/service/components/service-publish-step-four/service-publish-step-four.component';
import {ServicePublishDataHolderService} from '@app/service/services/service-publish-data-holder.service';
import {AbstractHandler} from '@app/service/services/steps-navigation-chain/abstract-handler';

@Injectable()
export class StepFourHandlerService extends AbstractHandler {

    constructor(private servicePublishDataHolderService: ServicePublishDataHolderService) {
        super();
    }

    public handle(): number {
        console.log(this.servicePublishDataHolderService.getStepData(this.getIndex()));
        if (this.servicePublishDataHolderService.isset(this.getIndex())) {
            return super.handle();
        }

        return this.getIndex();
    }

    protected getIndex(): number {
        return ServicePublishStepFourComponent.STEP;
    }
}
