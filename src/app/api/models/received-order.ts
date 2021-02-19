/* eslint-disable */
import { UserExtended } from './user-extended';
import { UserLocationInline } from './user-location-inline';
export interface ReceivedOrder {
  client?: UserExtended;
  client_location?: UserLocationInline;
  created?: string;
  duration?: string;
  end_datetime?: null | string;
  first_name?: string;
  id?: number;
  is_another_person?: boolean;
  last_name?: null | string;
  modified?: string;
  note?: null | string;
  phone?: null | string;
  price?: null | string;
  price_currency?: string;
  service: number;
  service_location?: null | number;
  source?: 'online' | 'manual';
  start_datetime: string;
  status?: 'not_confirmed' | 'confirmed' | 'paid' | 'completed' | 'canceled';
}
