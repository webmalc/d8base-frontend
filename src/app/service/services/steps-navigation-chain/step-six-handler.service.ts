import { Injectable } from '@angular/core';
import { MasterManagerService } from '@app/core/services/managers/master-manager.service';
import { ServicePublishSteps } from '@app/service/enums/service-publish-steps';
import { AbstractHandler } from '@app/service/services/steps-navigation-chain/abstract-handler';
import { Observable, of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';

@Injectable()
export class StepSixHandlerService extends AbstractHandler {
  constructor(private readonly masterManager: MasterManagerService) {
    super();
  }

  public handleNext(): Observable<number> {
    return this.handle(super.handleNext.bind(this));
  }

  public handlePrevious(): Observable<number> {
    return this.handle(super.handlePrevious.bind(this));
  }

  protected getIndex(): number {
    return ServicePublishSteps.Six;
  }

  private handle(handler: () => Observable<number>): Observable<number> {
    return this.masterManager.isMaster$.pipe(
      first(),
      switchMap(isMaster =>
        isMaster
          ? this.masterManager
              .getMasterList()
              .pipe(switchMap(list => (list.length !== 0 ? handler() : of(this.getIndex()))))
          : of(this.getIndex()),
      ),
    );
  }
}
