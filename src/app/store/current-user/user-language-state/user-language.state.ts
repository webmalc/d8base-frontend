import { Injectable } from '@angular/core';
import { UserLanguage } from '@app/api/models';
import { AccountsService } from '@app/api/services';
import { Action, State, StateContext } from '@ngxs/store';
import { forkJoin, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import * as UserLanguageActions from './user-language.actions';

type EntityState<T> = {
  byId: { [key: number]: T };
  ids: number[];
};
const uniqueArray = (arr: number[]): number[] => [...new Set(arr)];
const getByIdFromArray = <T extends { id?: number }>(arr: T[]): EntityState<T>['byId'] =>
  arr.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});

export const emptyEntityState: EntityState<UserLanguage> = {
  byId: {},
  ids: [],
};

export type UserLanguageStateModel = EntityState<UserLanguage>;

@Injectable()
@State<UserLanguageStateModel>({
  name: 'UserLanguage',
  defaults: emptyEntityState,
})
export class UserLanguageState {
  constructor(private readonly accountsService: AccountsService) {}

  @Action(UserLanguageActions.LoadAllUserLanguages)
  public loadAllUserLanguages({ setState }: StateContext<UserLanguageStateModel>): Observable<any> {
    return this.accountsService.accountsLanguagesList({}).pipe(
      tap(({ results }) => {
        const byId: EntityState<UserLanguage>['byId'] = getByIdFromArray<UserLanguage>(results);
        setState({
          ids: uniqueArray([...results.map(({ id }) => id)]),
          byId,
        });
      }),
    );
  }

  @Action(UserLanguageActions.CreateUserLanguage)
  public createUserLanguage(
    { setState, getState }: StateContext<UserLanguageStateModel>,
    { userLanguage }: UserLanguageActions.CreateUserLanguage,
  ): Observable<any> {
    return this.accountsService.accountsLanguagesCreate(userLanguage).pipe(
      tap(newUserLanguage => {
        const { ids, byId } = getState();
        setState({
          ids: uniqueArray([...ids, newUserLanguage.id]),
          byId: { ...byId, [newUserLanguage.id]: userLanguage },
        });
      }),
    );
  }

  @Action(UserLanguageActions.DeleteUserLanguage)
  public loadUserLanguage(
    { setState, getState }: StateContext<UserLanguageStateModel>,
    { id: idToLoad }: UserLanguageActions.LoadUserLanguage,
  ): Observable<any> {
    return this.accountsService.accountsLanguagesRead(idToLoad).pipe(
      tap(userLanguage => {
        const { ids, byId } = getState();
        setState({
          ids: uniqueArray([...ids, idToLoad]),
          byId: { ...byId, [idToLoad]: userLanguage },
        });
      }),
    );
  }

  @Action(UserLanguageActions.DeleteUserLanguage)
  public deleteUserLanguage(
    { setState, getState }: StateContext<UserLanguageStateModel>,
    { id: idToDelete }: UserLanguageActions.DeleteUserLanguage,
  ): Observable<any> {
    return this.accountsService.accountsLanguagesDelete(idToDelete).pipe(
      tap(() => {
        const { ids, byId } = getState();
        const { [idToDelete]: userLanguageToDelete, ...updatedUserLanguages } = byId;
        setState({
          ids: ids.filter(id => id !== idToDelete),
          byId: updatedUserLanguages,
        });
      }),
    );
  }

  @Action(UserLanguageActions.UpdateUserLanguagesList)
  public updateUserLanguages(
    { setState, getState }: StateContext<UserLanguageStateModel>,
    { newUserLanguages }: UserLanguageActions.UpdateUserLanguagesList,
  ): Observable<any> {
    const { ids } = getState();
    const deleteLanguages$ = forkJoin(
      ids.length ? ids.map(id => this.accountsService.accountsLanguagesDelete(id)) : of(0),
    );
    const createLanguages$ = forkJoin(
      newUserLanguages.map(({ language }) => this.accountsService.accountsLanguagesCreate({ language })),
    );
    return deleteLanguages$.pipe(
      switchMap(() => createLanguages$),
      tap(createdLanguages => {
        const ids = createdLanguages.map(({ id }) => id);
        const byId = getByIdFromArray<UserLanguage>(createdLanguages);
        setState({ byId, ids });
      }),
    );
  }
}
