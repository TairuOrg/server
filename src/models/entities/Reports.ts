import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Administrators } from "./Administrators";

@Index("fki_admin_id_reports_fk", ["adminId"], {})
@Index("reports_pkey", ["id"], { unique: true })
@Entity("reports", { schema: "public" })
export class Reports {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "admin_id" })
  adminId: number;

  @Column("character varying", { name: "type", length: 25 })
  type: string;

  @Column("character varying", { name: "report_url" })
  reportUrl: string;

  @Column("timestamp without time zone", { name: "date" })
  date: Date;

  @ManyToOne(() => Administrators, (administrators) => administrators.reports)
  @JoinColumn([{ name: "admin_id", referencedColumnName: "id" }])
  admin: Administrators;
}
