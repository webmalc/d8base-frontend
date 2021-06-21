import { ExpandedMessage } from '@app/message/shared/expanded-message.interface';
import { ChatsListItem } from './chats-list-item.interface';

export function getChatListItems(messages: ExpandedMessage[], myId: number): ChatsListItem[] {
  return messages.map(m => getChatListItem(m, myId));
}

function getChatListItem(message: ExpandedMessage, myId: number): ChatsListItem {
  const interlocutor = message.sender.id === myId ? message.recipient : message.sender;
  const unreadCount = 0; // TODO fill unread count
  return {
    trackById: `${interlocutor.id}|${unreadCount}`,
    interlocutorId: interlocutor.id,
    interlocutorName: `${interlocutor.first_name} ${interlocutor.last_name}`,
    lastMessageText: message.body,
    created: new Date(message.created),
    avatarThumbnail: interlocutor.avatar_thumbnail,
    unreadCount,
  };
}
