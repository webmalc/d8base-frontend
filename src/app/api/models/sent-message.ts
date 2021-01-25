/* eslint-disable */
export interface SentMessage {
  body: string;
  created?: string;
  created_by?: number;
  id?: number;

  /**
   * Has the message been read?
   */
  is_read?: boolean;
  modified?: string;
  modified_by?: number;
  parent?: null | number;
  read_datetime?: string;
  recipient: number;
  subject?: null | string;
}
