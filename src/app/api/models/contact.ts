/* eslint-disable */
export interface Contact {
  code?: null | string;
  countries?: Array<number>;
  created?: string;
  created_by?: number;
  excluded_countries?: Array<number>;
  id?: number;

  /**
   * Does the contact appear in the default list?
   */
  is_default?: boolean;
  modified?: string;
  modified_by?: number;
  name?: null | string;
}
