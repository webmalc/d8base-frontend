import { SentOrder } from '@app/core/models/sent-order';
import { User } from '@app/core/models/user';
import { Expose } from 'class-transformer';

export class ReceivedOrder extends SentOrder {
  @Expose() public client: User;
}
