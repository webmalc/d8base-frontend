import { OrderPostModel } from '@app/core/interfaces/order-model';
import { OrderStatus } from '@app/core/types/order-status';
import { Expose } from 'class-transformer';

export class SentOrder implements OrderPostModel {
  @Expose() public id: number;
  @Expose() public created: string;
  @Expose() public modified: string;
  @Expose() public status: OrderStatus;
  @Expose() public price_amount: string;
  @Expose() public price_currency: string;
  @Expose() public duration: string;
  @Expose() public service: number;
  @Expose() public start_datetime: string;
  @Expose() public end_datetime?: string;
  @Expose() public service_location?: number;
  @Expose() public client_location?: number;
  @Expose() public note?: string;
  @Expose() public is_another_person?: boolean;
  @Expose() public first_name?: string;
  @Expose() public last_name?: string;
  @Expose() public phone?: string;
}
