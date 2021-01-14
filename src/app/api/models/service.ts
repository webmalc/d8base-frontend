/* tslint:disable */
import { Price } from './price';
export interface Service {

  /**
   * step for booking in minutes
   */
  booking_interval?: number;
  created?: string;
  created_by?: number;
  description?: null | string;

  /**
   * duration in minutes
   */
  duration: number;
  id?: number;

  /**
   * are orders confirmed automatically?
   */
  is_auto_order_confirmation?: boolean;
  is_base_schedule?: boolean;
  is_enabled?: boolean;
  modified?: string;
  modified_by?: number;
  name: string;
  price?: Price;
  professional: number;
  service_type: 'online' | 'professional' | 'client';
}
