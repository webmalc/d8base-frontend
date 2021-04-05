import { UserLocation, UserSettings } from '@app/api/models';
import { AuthResponseInterface } from '@app/auth/interfaces/auth-response.interface';
import { CurrentUserStateModel } from './current-user-state.model';

export const notLoadedState: CurrentUserStateModel = {
  profile: null,
  tokens: null,
  professionals: null,
  settings: null,
  locations: null,
  errors: null,
};

export const emptyTokens: AuthResponseInterface = {
  access_token: null,
  expires_in: 0,
  token_type: null,
  scope: null,
  refresh_token: null,
};

export const defaultSettings: UserSettings = {
  units: 0,
  currency: 'CAD',
  language: 'en',
};

export const defaultLocation: UserLocation = {
  country: null,
  city: null,
};

export const guestState: CurrentUserStateModel = {
  profile: {},
  tokens: emptyTokens,
  professionals: [],
  settings: defaultSettings,
  locations: [],
  errors: [],
};
