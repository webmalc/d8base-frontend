/* eslint-disable */
export interface SentOrder {
  client_location?: null | number;
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
  price_amount?: string;
  price_currency?: string;
  service: number;
  service_location?: null | number;
  source?: 'online' | 'manual';
  start_datetime: string;
  status?: 'not_confirmed' | 'confirmed' | 'paid' | 'completed' | 'canceled';
}
