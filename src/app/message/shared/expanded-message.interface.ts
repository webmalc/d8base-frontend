import { Message } from '@app/api/models';
import { Interlocutor } from './interlocutor.interface';

export interface ExpandedMessage extends Omit<Message, 'sender' | 'recipient'> {
  sender: Interlocutor;
  recipient: Interlocutor;
}
