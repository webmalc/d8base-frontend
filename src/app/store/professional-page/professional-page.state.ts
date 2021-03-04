import { Injectable } from '@angular/core';
import { ProfessionalList } from '@app/api/models';
import { AccountsService, ProfessionalsService } from '@app/api/services';
import { Action, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import ProfessionalPageStateModel from './professional-page-state.model';
import * as ProfessionalPageActions from './professional-page.actions';

@State<ProfessionalPageStateModel>({
  name: 'professionalPage',
  defaults: null,
})
@Injectable()
export class ProfessionalPageState {
  constructor(private readonly api: AccountsService, private readonly professionalsApi: ProfessionalsService) {}

  @Action(ProfessionalPageActions.LoadProfessionalById)
  public loadMaster(
    { setState, patchState, dispatch }: StateContext<ProfessionalPageStateModel>,
    { masterId }: ProfessionalPageActions.LoadProfessionalById,
  ): Observable<any> {
    const masterIdNumber = Number.parseInt(masterId, 10);
    return this.getMaster(masterIdNumber).pipe(
      tap(master =>
        setState({
          user: master.user,
          master,
          canEdit: Number.isNaN(masterId),
        }),
      ),
    );
  }

  private getMaster(masterId: number): Observable<ProfessionalList> {
    return Number.isNaN(masterId)
      ? this.api.accountsProfessionalsList({}).pipe(
          map(list => list[0]),
          switchMap(master => this.professionalsApi.professionalsProfessionalsRead(master.id)),
        )
      : this.professionalsApi.professionalsProfessionalsRead(masterId);
  }
}
