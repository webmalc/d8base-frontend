import { Injectable } from '@angular/core';
import { AbstractMessage } from '@app/message/models/abstract-message';

@Injectable()
export class ChatsSearchService {
  public search(chatList: AbstractMessage[], needle: string): AbstractMessage[] {
    const result: AbstractMessage[] = [];
    chatList.forEach(item =>
      item.interlocutor.toLowerCase().includes(needle.toLowerCase()) ? result.push(item) : null,
    );

    return result;
  }
}
