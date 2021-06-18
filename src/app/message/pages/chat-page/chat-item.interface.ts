export interface ChatItem {
  id: string;
  messageId: number;
  type: 'sent' | 'received' | 'date-separator';
  timestamp: Date;
  body?: string;
  state?: 'received' | 'read';
}
