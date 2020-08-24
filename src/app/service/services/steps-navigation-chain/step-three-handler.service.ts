import {Injectable} from '@angular/core';
import {ServicePublishStepThreeComponent} from '@app/service/components/service-publish-step-three/service-publish-step-three.component';
import {AbstractHandler} from '@app/service/services/steps-navigation-chain/abstract-handler';
import {Observable, of} from 'rxjs';

@Injectable()
export class StepThreeHandlerService extends AbstractHandler {

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
        return ServicePublishStepThreeComponent.STEP;
    }
}
