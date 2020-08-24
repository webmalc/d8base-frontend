import {Injectable} from '@angular/core';
import {ServicePublishStepTwoComponent} from '@app/service/components/service-publish-step-two/service-publish-step-two.component';
import {AbstractHandler} from '@app/service/services/steps-navigation-chain/abstract-handler';
import {Observable, of} from 'rxjs';

@Injectable()
export class StepTwoHandlerService extends AbstractHandler {

    constructor() {
        super();
    }

    public handleNext(): Observable<number> {
        return of(this.getIndex());
    }

    public handlePrevious(): Observable<number> {
        return of(this.getIndex());
    }

    public getIndex(): number {
        return ServicePublishStepTwoComponent.STEP;
    }
}
