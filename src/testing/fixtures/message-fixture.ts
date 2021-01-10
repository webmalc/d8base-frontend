import { MessageInterface } from '../../app/message/interfaces/message-interface';

export class MessageFixture {
  public static create(id?: number, senderId?: number): MessageInterface {
    id = id || 0;

    return {
      id,
      body: `Body Message ${id}`,
      isRead: false,
      parent: null,
      subject: `Subject message ${id}`,
      sender: senderId || 0,
    };
  }
}
