import { Injectable } from '@angular/core';
import { UserSavedProfessional } from '@app/api/models';
import { AccountsService } from '@app/api/services';
import { Action, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as UserSavedProfessionalActions from './saved-professionals.actions';

export const emptyUserSavedProfessionalState: UserSavedProfessional[] = null;

export type UserSavedProfessionalStateModel = UserSavedProfessional[];

@Injectable()
@State<UserSavedProfessionalStateModel>({
  name: 'UserSavedProfessional',
  defaults: emptyUserSavedProfessionalState,
})
export class UserSavedProfessionalState {
  constructor(private readonly accountsService: AccountsService) {}

  @Action(UserSavedProfessionalActions.LoadAllUserSavedProfessionals)
  public loadAllUserSavedProfessionals({ setState }: StateContext<UserSavedProfessionalStateModel>): Observable<any> {
    return this.accountsService.accountsSavedProfessionalsList({}).pipe(
      tap(({ results }) => {
        setState(results);
      }),
    );
  }

  @Action(UserSavedProfessionalActions.CreateUserSavedProfessional)
  public createUserSavedProfessional(
    { setState, getState }: StateContext<UserSavedProfessionalStateModel>,
    { professionalId }: UserSavedProfessionalActions.CreateUserSavedProfessional,
  ): Observable<any> {
    return this.accountsService.accountsSavedProfessionalsCreate({ professional: professionalId }).pipe(
      tap(newUserSavedProfessional => {
        const savedProfessionals = getState();
        setState(savedProfessionals.concat(newUserSavedProfessional));
      }),
    );
  }

  @Action(UserSavedProfessionalActions.DeleteUserSavedProfessional)
  public deleteUserSavedProfessional(
    { setState, getState }: StateContext<UserSavedProfessionalStateModel>,
    { professionalId: professionalIdToDelete }: UserSavedProfessionalActions.DeleteUserSavedProfessional,
  ): Observable<any> {
    const savedProfessionals = getState();
    const idToDelete = savedProfessionals.find(({ professional }) => professional === professionalIdToDelete)?.id;
    return this.accountsService.accountsSavedProfessionalsDelete(idToDelete).pipe(
      tap(() => {
        setState(savedProfessionals.filter(({ id }) => id !== idToDelete));
      }),
    );
  }
}
