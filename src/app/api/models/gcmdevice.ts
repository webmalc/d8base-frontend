/* eslint-disable */
export interface GCMDevice {

  /**
   * Inactive devices will not be sent notifications
   */
  active?: boolean;

  /**
   * Opaque application identity, should be filled in for multiple key/certificate access
   */
  application_id?: null | string;

  /**
   * You should choose FCM or GCM
   */
  cloud_message_type?: 'FCM' | 'GCM';
  date_created?: string;

  /**
   * ANDROID_ID / TelephonyManager.getDeviceId() (e.g: 0x01)
   */
  device_id?: null | number;
  id?: number;
  name?: null | string;
  registration_id: string;
}
