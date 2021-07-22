/* eslint-disable */
import { UserContactInline } from './user-contact-inline';
import { UserLanguage } from './user-language';
import { Country } from './country';
export interface ReceivedOrderClient {
  avatar?: string;
  avatar_thumbnail?: string;
  birthday?: null | string;
  contacts?: Array<UserContactInline>;
  email: string;
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
  phone?: null | string;
}
