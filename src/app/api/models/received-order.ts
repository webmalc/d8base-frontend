/* eslint-disable */
import { ReceivedOrderClient } from './received-order-client';
import { UserLocationInline } from './user-location-inline';
import { Phone } from './phone';
export interface ReceivedOrder {
  cancel_reason?: null | 'dates' | 'other';
  client?: ReceivedOrderClient;
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
  phone_extended?: Phone;
  price?: null | string;
  price_currency?: string;
  service: number;
  service_location?: null | number;
  source?: 'online' | 'manual';
  start_datetime: string;
  status?: 'not_confirmed' | 'confirmed' | 'paid' | 'completed' | 'canceled' | 'overdue';
}
