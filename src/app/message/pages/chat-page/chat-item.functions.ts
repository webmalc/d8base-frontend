import { Message } from '@app/api/models';
import { ChatItem } from './chat-item.interface';

export function getChatItems(messages: Message[], senderId: number): ChatItem[] {
  return messages.map(m => getChatItem(m, senderId));
}

function getChatItem(message: Message, senderId: number): ChatItem {
  const type = message.sender === senderId ? 'received' : 'sent';
  const state = message.is_read ? 'read' : 'received';
  return {
    trackById: `${type}|${message.id}|${state}`,
    messageId: message.id,
    body: message.body,
    type,
    timestamp: new Date(message.created),
    state,
  };
}
