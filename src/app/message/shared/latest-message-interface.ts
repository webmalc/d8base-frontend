import { PartialUserInterface } from '@app/core/interfaces/partial-user-interface';

export interface LatestMessageInterface {
  id: number;
  sender: PartialUserInterface;
  recipient: PartialUserInterface;
  subject: string;
  body: string;
  is_read: boolean;
  read_datetime: string;
  created: string;
}
