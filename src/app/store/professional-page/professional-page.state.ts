import { Injectable } from '@angular/core';
import { Profile } from '@app/api/models';
import { ProfessionalsService } from '@app/api/services';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Action, Select, State, StateContext } from '@ngxs/store';
import { forkJoin, Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import * as ProfessionalContactActions from './professional-contacts/professional-contacts.actions';
import * as ProfessionalLocationActions from './professional-locations/professional-locations.actions';
import { ProfessionalContactState } from './professional-contacts/professional-contacts.state';
import { ProfessionalLocationState } from './professional-locations/professional-locations.state';
import ProfessionalPageStateModel from './professional-page-state.model';
import * as ProfessionalPageActions from './professional-page.actions';
import { defaultState } from './professional-page.constants';

@State<ProfessionalPageStateModel>({
  name: 'professionalPage',
  defaults: defaultState,
  children: [ProfessionalContactState, ProfessionalLocationState],
})
@Injectable()
export class ProfessionalPageState {
  @Select(CurrentUserSelectors.profile)
  public profile$: Observable<Profile>;

  constructor(private readonly professionalsApi: ProfessionalsService) {}

  @Action(ProfessionalPageActions.LoadProfessionalById)
  public loadMaster(
    { setState, dispatch }: StateContext<ProfessionalPageStateModel>,
    { masterId }: ProfessionalPageActions.LoadProfessionalById,
  ): Observable<any> {
    const masterIdNumber = Number.parseInt(masterId, 10);
    setState(defaultState);
    return forkJoin([
      this.profile$.pipe(first(x => !!x)),
      this.professionalsApi.professionalsProfessionalsRead(masterIdNumber),
    ]).pipe(
      tap(([profile, professional]) => {
        const canEdit = professional.user.id === profile.id;
        if (canEdit) {
          dispatch(new ProfessionalContactActions.LoadAllProfessionalContacts());
          dispatch(new ProfessionalLocationActions.LoadAllProfessionalLocations());
        }
        setState({
          user: professional.user,
          professional,
          canEdit,
        });
      }),
    );
  }
}
