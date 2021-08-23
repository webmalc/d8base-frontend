import { City, Country, PostalCode } from '@app/api/models';
import { ServiceTimetableInterface } from '@app/service/interfaces/service-timetable-interface';

export interface StepSevenDataInterface extends ServiceTimetableInterface {
  country: Country;
  city: City;
  address?: string;
  postal_code?: PostalCode;
  payment_cash: boolean;
  payment_online: boolean;
  use_default_location: boolean;
  need_to_create_master_schedule: boolean;
  use_master_schedule: boolean;
  max_distance: number;
  units: string;
  default_location: number;
  is_auto_order_confirmation?: boolean;
}
