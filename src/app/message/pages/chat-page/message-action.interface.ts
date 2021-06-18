export interface MessageAction {
  actionType?: 'delete' | 'edit';
  messageId?: number;
  messageBody?: string;
}
