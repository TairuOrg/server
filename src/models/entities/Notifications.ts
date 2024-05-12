import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SentNotifications } from "./SentNotifications";

@Index("notifications_pkey", ["id"], { unique: true })
@Entity("notifications", { schema: "public" })
export class Notifications {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("timestamp without time zone", { name: "date" })
  date: Date;

  @Column("character varying", { name: "body_message" })
  bodyMessage: string;

  @Column("character varying", { name: "priority_status" })
  priorityStatus: string;

  @OneToMany(
    () => SentNotifications,
    (sentNotifications) => sentNotifications.notification
  )
  sentNotifications: SentNotifications[];
}
