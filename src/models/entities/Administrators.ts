import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Entries } from "./Entries";
import { Reports } from "./Reports";
import { SentNotifications } from "./SentNotifications";

@Index("unique", ["email", "personalId", "phoneNumber"], { unique: true })
@Index("administrators_pkey", ["id"], { unique: true })
@Entity("administrators", { schema: "public" })
export class Administrators {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "personal_id",
    unique: true,
    length: 10,
  })
  personalId: string;

  @Column("character varying", { name: "password", length: 256 })
  password: string;

  @Column("character varying", { name: "name", length: 70 })
  name: string;

  @Column("character varying", {
    name: "phone_number",
    unique: true,
    length: 17,
  })
  phoneNumber: string;

  @Column("character varying", { name: "email", unique: true, length: 120 })
  email: string;

  @Column("character varying", { name: "residence_location", length: 50 })
  residenceLocation: string;

  @OneToMany(() => Entries, (entries) => entries.admin)
  entries: Entries[];

  @OneToMany(() => Reports, (reports) => reports.admin)
  reports: Reports[];

  @OneToMany(
    () => SentNotifications,
    (sentNotifications) => sentNotifications.admin
  )
  sentNotifications: SentNotifications[];
}
