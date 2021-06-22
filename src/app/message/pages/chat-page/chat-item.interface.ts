/**
 * Chat message representation model
 */
export interface ChatItem {
  trackById: string;
  messageId: number;
  type: 'sent' | 'received' | 'date-separator';
  timestamp: Date;
  body?: string;
  state?: 'received' | 'read';
}
