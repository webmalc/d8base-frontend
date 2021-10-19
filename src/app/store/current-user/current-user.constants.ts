import { UserSettings } from '@app/api/models';
import { AuthResponseInterface } from '@app/core/interfaces/auth-response.interface';
import { environment } from '@env/environment';
import { CurrentUserStateModel } from './current-user-state.model';

const defaultLanguage: UserSettings['language'] = /^ru/.test(navigator?.language)
  ? 'ru'
  : (environment.default_lang as UserSettings['language']);

export const defaultSettings: UserSettings = {
  units: 0,
  currency: 'CAD',
  is_monday_start_of_a_week: true,
  language: defaultLanguage,
};

export const emptyTokens: AuthResponseInterface = {
  access_token: null,
  expires_in: 0,
  token_type: null,
  scope: null,
  refresh_token: null,
};

export const notLoadedState: CurrentUserStateModel = {
  profile: null,
  tokens: null,
  professionals: null,
  settings: { ...defaultSettings, language: null },
  errors: null,
};

export const guestState: CurrentUserStateModel = {
  profile: {},
  tokens: emptyTokens,
  professionals: [],
  settings: defaultSettings,
  errors: [],
};
