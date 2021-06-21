import { ReceivedMessage } from '@app/api/models';
import { ExpandedMessage } from '@app/message/shared/expanded-message.interface';
import { ChatsListItem } from './chats-list-item.interface';

type NumberMap = { [key: number]: number };

export function getChatListItems(
  messages: ExpandedMessage[],
  unread: ReceivedMessage[],
  myId: number,
): ChatsListItem[] {
  const unreadMap: NumberMap = {};
  unread.forEach(mes => (unreadMap[mes.sender] = (unreadMap[mes.sender] ?? 0) + 1));
  return messages.map(m => getChatListItem(m, unreadMap, myId));
}

function getChatListItem(message: ExpandedMessage, unreadMap: NumberMap, myId: number): ChatsListItem {
  const interlocutor = message.sender.id === myId ? message.recipient : message.sender;
  const unreadCount = unreadMap[interlocutor.id] ?? 0;
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
