import {Injectable} from '@angular/core';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {ServicePublishStepSixComponent} from '@app/service/components/service-publish-step-six/service-publish-step-six.component';
import {ServicePublishDataHolderService} from '@app/service/services/service-publish-data-holder.service';
import {AbstractHandler} from '@app/service/services/steps-navigation-chain/abstract-handler';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable()
export class StepSixHandlerService extends AbstractHandler {

    constructor(private servicePublishDataHolderService: ServicePublishDataHolderService, private masterManager: MasterManagerService) {
        super();
    }

    public handleNext(): Observable<number> {
        return this.handle(super.handleNext.bind(this));
    }

    public handlePrevious(): Observable<number> {
        return this.handle(super.handlePrevious.bind(this));
    }

    public getIndex(): number {
        return ServicePublishStepSixComponent.STEP;
    }

    private handle(handler: () => Observable<number>): Observable<number> {
        return this.masterManager.isMaster().pipe(
            switchMap(
                isMaster => isMaster ? this.masterManager.getMasterList().pipe(
                    switchMap(list => list.length !== 0 ? handler() : of(this.getIndex()))
                ) : of(this.getIndex())
            )
        );
    }
}
