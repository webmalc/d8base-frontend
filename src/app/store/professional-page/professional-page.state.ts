import { Injectable } from '@angular/core';
import { Profile } from '@app/api/models';
import { AccountsService, ProfessionalsService } from '@app/api/services';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Action, Select, State, StateContext } from '@ngxs/store';
import { forkJoin, Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { defaultState } from './professional-page.constants';

import ProfessionalPageStateModel from './professional-page-state.model';
import * as ProfessionalPageActions from './professional-page.actions';

@State<ProfessionalPageStateModel>({
  name: 'professionalPage',
  defaults: defaultState,
})
@Injectable()
export class ProfessionalPageState {

  @Select(CurrentUserSelectors.profile)
  public profile$: Observable<Profile>;

  constructor(private readonly api: AccountsService, private readonly professionalsApi: ProfessionalsService) {
  }

  @Action(ProfessionalPageActions.LoadProfessionalById)
  public loadMaster(
    { setState }: StateContext<ProfessionalPageStateModel>,
    { masterId }: ProfessionalPageActions.LoadProfessionalById,
  ): Observable<any> {
    const masterIdNumber = Number.parseInt(masterId, 10);
    setState(defaultState);
    return forkJoin([
      this.profile$.pipe(first(x => !!x)),
      this.professionalsApi.professionalsProfessionalsRead(masterIdNumber),
    ]).pipe(
      tap(([profile, professional]) =>
        setState({
          user: professional.user,
          professional,
          canEdit: professional.user.id === profile.id,
        }),
      ),
    );
  }
}
