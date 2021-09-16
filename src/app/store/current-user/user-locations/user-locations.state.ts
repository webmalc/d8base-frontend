import { Injectable } from '@angular/core';
import { UserLocation } from '@app/api/models';
import { AccountsService } from '@app/api/services';
import { ResolvedUserLocation } from '@app/core/interfaces/user-location.interface';
import { Storage } from '@ionic/storage';
import { CurrentLocationService } from '@app/core/services/location/current-location.service';
import { Action, State, StateContext } from '@ngxs/store';
import { from, Observable, of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import * as UserLocationActions from './user-locations.actions';

const USER_LOCATION_STORAGE_KEY = 'user_location';

export const emptyUserLocationState: UserLocationStateModel = {};

export interface UserLocationStateModel {
  guessedLocation?: UserLocation;
  savedLocations?: UserLocation[];
}

interface UserLocationStorageModel {
  location: ResolvedUserLocation;
}

@Injectable()
@State<UserLocationStateModel>({
  name: 'UserLocation',
  defaults: emptyUserLocationState,
})
export class UserLocationState {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly currentLocationService: CurrentLocationService,
    private readonly storage: Storage,
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
    { locationId: locationIdToDelete }: UserLocationActions.DeleteUserLocation,
  ) {
    const locations = getState().savedLocations ?? [];
    const idToDelete = locations.find(({ id }) => id === locationIdToDelete)?.id;
    return this.accountsService.accountsLocationsDelete(idToDelete).pipe(
      tap(() => {
        patchState({ savedLocations: locations.filter(({ id }) => id !== idToDelete) });
      }),
    );
  }

  @Action(UserLocationActions.GuessCurrentLocation)
  public guessCurrentLocation({ patchState }: StateContext<UserLocationStateModel>) {
    const getSaved$ = from(this.storage.get(USER_LOCATION_STORAGE_KEY)) as Observable<UserLocationStorageModel>;
    const save$ = (model: UserLocationStorageModel) => from(this.storage.set(USER_LOCATION_STORAGE_KEY, model));
    const guessAndSave$ = this.currentLocationService
      .guessLocation()
      .pipe(
        mergeMap(location =>
          location ? save$({ location }).pipe(map(() => location)) : of<ResolvedUserLocation>(null),
        ),
      );
    return getSaved$.pipe(
      mergeMap(savedModel => (savedModel?.location ? of(savedModel.location) : guessAndSave$)),
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
