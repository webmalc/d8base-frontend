import { Injectable } from '@angular/core';
import { ProfessionalList } from '@app/api/models';
import { Master } from '@app/core/models/master';
import { MasterApiService } from '@app/master/services/master-api.service';
import { MasterReadonlyApiService } from '@app/master/services/master-readonly-api.service';
import * as CurrentUserActions from '@app/store/current-user/current-user.actions';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MasterManagerService {
  @Select(CurrentUserSelectors.isMaster)
  public isMaster$: Observable<boolean>;

  constructor(private readonly masterApi: MasterApiService, private readonly masterReadonlyApi: MasterReadonlyApiService) {}

  public getMasterList(): Observable<ProfessionalList[]> {
    return this.masterApi.get().pipe(map(data => data.results));
  }

  public updateMaster(master: Master): Observable<Master> {
    return this.masterApi.put(master);
  }

  @Dispatch()
  public createMaster(master: ProfessionalList): CurrentUserActions.CreateProfessional {
    return new CurrentUserActions.CreateProfessional(master);
  }

  public getMaster(masterId?: number): Observable<Master> {
    return this.masterApi.getByEntityId(masterId);
  }

  public getUserLessList$(ids: number[]): Observable<ProfessionalList[]> {
    return this.masterReadonlyApi.getList(ids);
  }
}
