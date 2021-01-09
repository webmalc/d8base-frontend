import { Currency } from '@app/core/models/currency';

export interface StepTwoDataInterface {
  name: string;
  description: string;
  duration: number;
  is_price_fixed: boolean;
  price: string;
  price_currency: Currency;
  start_price: string;
  end_price: string;
  service_type: string;
}
