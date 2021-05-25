import { Injectable } from '@angular/core';
import { ServicePublishSteps } from '@app/service/enums/service-publish-steps';
import { AbstractHandler } from '@app/service/services/steps-navigation-chain/abstract-handler';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { first, mergeMap } from 'rxjs/operators';

@Injectable()
export class StepFiveHandlerService extends AbstractHandler {
  @Select(CurrentUserSelectors.isMaster)
  public isMaster$: Observable<boolean>;

  public handleNext(): Observable<number> {
    return this.handle(super.handleNext.bind(this));
  }

  public handlePrevious(): Observable<number> {
    return this.handle(super.handlePrevious.bind(this));
  }

  protected getIndex(): number {
    return ServicePublishSteps.Five;
  }

  private handle(handler: () => Observable<number>): Observable<number> {
    return this.isMaster$.pipe(
      first(),
      mergeMap(isAuthenticated => (isAuthenticated ? handler() : of(this.getIndex()))),
    );
  }
}
