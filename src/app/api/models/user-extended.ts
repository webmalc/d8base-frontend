/* eslint-disable */
import { UserLanguage } from './user-language';
import { Country } from './country';
export interface UserExtended {
  avatar?: string;
  avatar_thumbnail?: string;
  birthday?: null | string;
  first_name?: string;
  gender?: null | 0 | 1;
  id?: number;

  /**
   * is account confirmed?
   */
  is_confirmed?: boolean;
  languages?: Array<UserLanguage>;
  last_name?: string;
  nationality?: Country;
}
