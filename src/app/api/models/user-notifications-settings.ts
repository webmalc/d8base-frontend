/* eslint-disable */
export interface UserNotificationsSettings {
  created?: string;
  created_by?: number;
  id?: number;

  /**
   * Receive notifications about new messages?
   */
  is_messenger?: boolean;

  /**
   * Receive promotional messages?
   */
  is_promotional?: boolean;
  modified?: string;
  modified_by?: number;
}
