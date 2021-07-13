import { Injectable } from '@angular/core';
import { UserLocation } from '@app/api/models';
import { AccountsService } from '@app/api/services';
import { CurrentLocationService } from '@app/core/services/current-location.service';
import { Action, State, StateContext } from '@ngxs/store';
import { mergeMap, tap } from 'rxjs/operators';
import * as UserLocationActions from './user-locations.actions';

export const emptyUserLocationState: UserLocationStateModel = {};

export type UserLocationStateModel = {
  guessedLocation?: UserLocation;
  savedLocations?: UserLocation[];
};

@Injectable()
@State<UserLocationStateModel>({
  name: 'UserLocation',
  defaults: emptyUserLocationState,
})
export class UserLocationState {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly currentLocationService: CurrentLocationService,
  ) {}

  @Action(UserLocationActions.LoadAllUserLocations)
  public loadAllUserLocations({ patchState }: StateContext<UserLocationStateModel>) {
    return this.accountsService.accountsLocationsList({}).pipe(
      tap(({ results }) => {
        patchState({ savedLocations: results });
      }),
    );
  }

  @Action(UserLocationActions.CreateUserLocation)
  public createUserLocation(
    { patchState, getState }: StateContext<UserLocationStateModel>,
    { location }: UserLocationActions.CreateUserLocation,
  ) {
    return this.accountsService.accountsLocationsCreate(location).pipe(
      tap(newUserLocation => {
        const locations = getState().savedLocations ?? [];
        patchState({ savedLocations: locations.concat(newUserLocation) });
      }),
    );
  }

  @Action(UserLocationActions.UpdateUserLocation)
  public updateUserLocation(
    { dispatch }: StateContext<UserLocationStateModel>,
    { location }: UserLocationActions.UpdateUserLocation,
  ) {
    return this.accountsService
      .accountsLocationsUpdate({ id: location.id, data: location })
      .pipe(mergeMap(() => dispatch(new UserLocationActions.LoadAllUserLocations())));
  }

  @Action(UserLocationActions.DeleteUserLocation)
  public deleteUserLocation(
    { patchState, getState }: StateContext<UserLocationStateModel>,
    { locationId: LocationIdToDelete }: UserLocationActions.DeleteUserLocation,
  ) {
    const Locations = getState().savedLocations ?? [];
    const idToDelete = Locations.find(({ id }) => id === LocationIdToDelete)?.id;
    return this.accountsService.accountsLocationsDelete(idToDelete).pipe(
      tap(() => {
        patchState({ savedLocations: Locations.filter(({ id }) => id !== idToDelete) });
      }),
    );
  }

  @Action(UserLocationActions.GuessCurrentLocation)
  public guessCurrentLocation({ patchState }: StateContext<UserLocationStateModel>) {
    return this.currentLocationService.guessLocation().pipe(
      tap(location =>
        patchState({
          guessedLocation: {
            country: location?.country?.id,
            city: location?.city?.id,
          },
        }),
      ),
    );
  }
}
