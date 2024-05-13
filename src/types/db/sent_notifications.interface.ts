import { Administrator } from './administrators.interface';
import { Notification } from './notifications.interface';

export interface SentNotification {
  id: number;
  notificationId: number;
  adminId: number;
  isRead: boolean;
  isIgnored: boolean;
  administrator?: Administrator; // Related administrator
  notification?: Notification; // Related notification
}