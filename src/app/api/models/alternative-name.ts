/* eslint-disable */
export interface AlternativeName {
  id?: number;
  is_colloquial?: boolean;
  is_historic?: boolean;
  is_preferred?: boolean;
  is_short?: boolean;
  kind?: 'name' | 'abbr' | 'link' | 'iata' | 'icao' | 'faac';
  language_code: string;
  name: string;
  slug?: null | string;
}
