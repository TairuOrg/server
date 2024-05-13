import { SentNotification } from './sent_notifications.interface';

enum PriorityStatus {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export interface Notification {
  id: number;
  date: Date;
  bodyMessage: string;
  priorityStatus: PriorityStatus;
  sentNotifications?: SentNotification[]; // Array of related sentNotifications
}
