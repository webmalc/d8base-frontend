/* eslint-disable max-classes-per-file */

import { UserLocation } from '@app/api/models';

export class LoadAllUserLocations {
  public static readonly type = '[UserLocation] Load all user locations';
}

export class CreateUserLocation {
  public static readonly type = '[UserLocation] Create new user location';

  constructor(public location: UserLocation) {}
}

export class UpdateUserLocation {
  public static readonly type = '[UserLocation] Update user location';

  constructor(public location: UserLocation) {}
}

export class DeleteUserLocation {
  public static readonly type = '[UserLocation] Delete user location';

  constructor(public locationId: UserLocation['id']) {}
}

export class GuessCurrentLocation {
  public static readonly type = '[UserLocation] Guess current location';
}
