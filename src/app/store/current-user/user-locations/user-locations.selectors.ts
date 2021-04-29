import { Country, UserLocation } from '@app/api/models';
import { Selector } from '@ngxs/store';
import { UserLocationState, UserLocationStateModel } from './user-locations.state';

export const defaultLocation: UserLocation = {
  country: null,
  city: null,
};

export default class UserLocationSelectors {
  @Selector([UserLocationState])
  public static locations(data: UserLocationStateModel): UserLocation[] {
    return data ?? [];
  }

  @Selector([UserLocationSelectors.locations])
  public static defaultLocation(data: UserLocation[]): UserLocation {
    return data[0] ?? defaultLocation;
  }

  @Selector([UserLocationSelectors.locations])
  public static additionalLocations(data: UserLocation[]): UserLocation[] {
    return data?.slice(1);
  }

  @Selector([UserLocationSelectors.defaultLocation])
  public static defaultCountry(data: UserLocation): Country['id'] {
    return data?.country;
  }
}
