import { Entry } from "./entries.interface";
import { Report } from "./reports.interface"
import { SentNotification } from "./sent_notifications.interface";

export interface Administrator {
    id: number;
    personalId: string;
    password: string;
    name: string;
    phoneNumber: string;
    email: string;
    residenceLocation: string;
    entries?: Entry[]; // Array of related entries
    reports?: Report[]; // Array of related reports
    sentNotifications?: SentNotification[]; // Array of related sentNotifications
  }
  