/**
 * Chat representation model
 */
export interface ChatsListItem {
  trackById: string;
  interlocutorName: string;
  interlocutorId: number;
  avatarThumbnail: string;
  lastMessageText: string;
  created: Date;
  unreadCount: number;
}
