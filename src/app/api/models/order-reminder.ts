/* eslint-disable */
export interface OrderReminder {
  created?: string;
  id?: number;
  is_reminded?: boolean;
  modified?: string;
  order: number;

  /**
   * number of minutes for a reminder before the event
   */
  remind_before: number;
  remind_before_datetime?: string;
}
