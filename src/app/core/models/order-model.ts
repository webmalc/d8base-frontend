export interface OrderPostModel {
  service: number;
  start_datetime: string;
  end_datetime?: string;
  service_location?: number;
  client_location?: number;
  note?: string;
  is_another_person?: boolean;
  first_name?: string;
  last_name?: string;
  phone?: string;
}

export interface OrderModel extends OrderPostModel {
  id: number;
  created: string;
  modified: string;
  status: string;
  price_amount: string;
  price_currency: string;
  duration: string;
}
