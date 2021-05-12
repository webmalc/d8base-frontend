import { Injectable } from '@angular/core';
import { UserLocation } from '@app/api/models';
import { AccountsService } from '@app/api/services';
import { Action, State, StateContext } from '@ngxs/store';
import { mergeMap, tap } from 'rxjs/operators';
import * as UserLocationActions from './user-locations.actions';

export const emptyUserLocationState: UserLocation[] = null;

export type UserLocationStateModel = UserLocation[];

@Injectable()
@State<UserLocationStateModel>({
  name: 'UserLocation',
  defaults: emptyUserLocationState,
})
export class UserLocationState {
  constructor(private readonly accountsService: AccountsService) {}

  @Action(UserLocationActions.LoadAllUserLocations)
  public loadAllUserLocations({ setState }: StateContext<UserLocationStateModel>) {
    return this.accountsService.accountsLocationsList({}).pipe(
      tap(({ results }) => {
        setState(results);
      }),
    );
  }

  @Action(UserLocationActions.CreateUserLocation)
  public createUserLocation(
    { setState, getState }: StateContext<UserLocationStateModel>,
    { location }: UserLocationActions.CreateUserLocation,
  ) {
    return this.accountsService.accountsLocationsCreate(location).pipe(
      tap(newUserLocation => {
        const locations = getState();
        setState(locations.concat(newUserLocation));
      }),
    );
  }

  @Action(UserLocationActions.UpdateUserLocation)
  public updateUserLocation(
    { dispatch }: StateContext<UserLocationStateModel>,
    { location }: UserLocationActions.UpdateUserLocation,
  ) {
    return this.accountsService.accountsLocationsUpdate({ id: location.id, data: location }).pipe(
      mergeMap(() => dispatch(new UserLocationActions.LoadAllUserLocations())),
    );
  }

  @Action(UserLocationActions.DeleteUserLocation)
  public deleteUserLocation(
    { setState, getState }: StateContext<UserLocationStateModel>,
    { locationId: LocationIdToDelete }: UserLocationActions.DeleteUserLocation,
  ) {
    const Locations = getState();
    const idToDelete = Locations.find(({ id }) => id === LocationIdToDelete)?.id;
    return this.accountsService.accountsLocationsDelete(idToDelete).pipe(
      tap(() => {
        setState(Locations.filter(({ id }) => id !== idToDelete));
      }),
    );
  }
}
