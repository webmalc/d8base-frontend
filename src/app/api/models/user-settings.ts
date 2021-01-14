/* tslint:disable */
export interface UserSettings {
  created?: string;
  created_by?: number;
  currency?: null | 'CAD' | 'EUR' | 'RUB' | 'USD';
  id?: number;

  /**
   * Is the last name hidden from other users?
   */
  is_last_name_hidden?: boolean;
  language?: null | 'en' | 'fr' | 'de' | 'ru';
  modified?: string;
  modified_by?: number;
  units?: 0 | 1;
}
