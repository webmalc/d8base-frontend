import { Country, UserLocation } from '@app/api/models';
import { Selector } from '@ngxs/store';
import { UserLocationState, UserLocationStateModel } from './user-locations.state';

export const emptyLocation: UserLocation = {
  country: null,
  city: null,
};

export default class UserLocationSelectors {
  @Selector([UserLocationState])
  public static locations(data: UserLocationStateModel): UserLocation[] {
    return data.savedLocations ?? [];
  }

  @Selector([UserLocationState])
  public static defaultLocation(data: UserLocationStateModel): UserLocation {
    const savedLocation = data.savedLocations && data.savedLocations[0];
    return savedLocation ?? data.guessedLocation ?? emptyLocation;
  }

  @Selector([UserLocationSelectors.locations])
  public static additionalLocations(locations: UserLocation[]): UserLocation[] {
    // TODO remove this selector
    return locations?.slice(1);
  }

  @Selector([UserLocationSelectors.defaultLocation])
  public static defaultCountry(data: UserLocation): Country['id'] {
    return data?.country;
  }
}
