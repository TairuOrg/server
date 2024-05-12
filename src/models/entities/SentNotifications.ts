import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Administrators } from "./Administrators";
import { Notifications } from "./Notifications";

@Index("fki_admin_id_sent_notifications_fk", ["adminId"], {})
@Index("sent_notifications_pkey", ["id"], { unique: true })
@Index("fki_notification_id_sent_notifications_fk", ["notificationId"], {})
@Entity("sent_notifications", { schema: "public" })
export class SentNotifications {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "notification_id" })
  notificationId: number;

  @Column("integer", { name: "admin_id" })
  adminId: number;

  @Column("boolean", { name: "is_read" })
  isRead: boolean;

  @Column("boolean", { name: "is_ignored" })
  isIgnored: boolean;

  @ManyToOne(
    () => Administrators,
    (administrators) => administrators.sentNotifications
  )
  @JoinColumn([{ name: "admin_id", referencedColumnName: "id" }])
  admin: Administrators;

  @ManyToOne(
    () => Notifications,
    (notifications) => notifications.sentNotifications
  )
  @JoinColumn([{ name: "notification_id", referencedColumnName: "id" }])
  notification: Notifications;
}
