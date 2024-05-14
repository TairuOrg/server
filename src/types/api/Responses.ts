export const NotificationStatus = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
} as const;
export type NotificationStatus =
  (typeof NotificationStatus)[keyof typeof NotificationStatus];

export interface AuthResponse {
  error: boolean;
  body: {
    userId?: string;
    message: {
      title: string;
      description: string;
      notificationStatus: NotificationStatus;
    };
  };
}
