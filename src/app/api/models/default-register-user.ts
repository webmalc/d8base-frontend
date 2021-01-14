/* tslint:disable */
export interface DefaultRegisterUser {
  account_type?: 'user' | 'professional';
  avatar?: null | string;
  birthday?: null | string;
  contacts?: Array<number>;
  email: string;
  first_name?: string;
  gender?: null | 0 | 1;
  id?: number;

  /**
   * is account confirmed?
   */
  is_confirmed?: boolean;
  languages?: Array<number>;
  last_name?: string;
  locations?: Array<number>;
  nationality?: null | number;
  password: string;
  password_confirm: string;
  patronymic?: null | string;
  phone?: null | string;
}
