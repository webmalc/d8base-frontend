import { Injectable } from '@angular/core';
import { ProfessionalList } from '@app/api/models';
import * as CurrentUserActions from '@app/store/current-user/current-user.actions';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable()
export class MasterManagerService {
  @Select(CurrentUserSelectors.isMaster)
  public isMaster$: Observable<boolean>;

  @Select(CurrentUserSelectors.professionals)
  public professionals$: Observable<ProfessionalList[]>;

  public getMasterList(): Observable<ProfessionalList[]> {
    return this.professionals$.pipe(first(x => !!x));
  }

  @Dispatch()
  public createMaster(master: ProfessionalList): CurrentUserActions.CreateProfessional {
    return new CurrentUserActions.CreateProfessional(master);
  }
}
