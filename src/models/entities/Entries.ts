import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Administrators } from "./Administrators";
import { EntriesItems } from "./EntriesItems";

@Index("fki_admin_id_entries_fk", ["adminId"], {})
@Index("entries_pkey", ["id"], { unique: true })
@Entity("entries", { schema: "public" })
export class Entries {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "admin_id" })
  adminId: number;

  @Column("text", { name: "description" })
  description: string;

  @Column("timestamp without time zone", { name: "date" })
  date: Date;

  @ManyToOne(() => Administrators, (administrators) => administrators.entries)
  @JoinColumn([{ name: "admin_id", referencedColumnName: "id" }])
  admin: Administrators;

  @OneToMany(() => EntriesItems, (entriesItems) => entriesItems.entry)
  entriesItems: EntriesItems[];
}
