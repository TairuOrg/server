import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Entries } from "./Entries";
import { Items } from "./Items";

@Index("fki_entry_id_entries_items_fk", ["entryId"], {})
@Index("entries_items_pkey", ["id"], { unique: true })
@Index("fki_e", ["itemId"], {})
@Entity("entries_items", { schema: "public" })
export class EntriesItems {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "entry_id" })
  entryId: number;

  @Column("integer", { name: "item_id" })
  itemId: number;

  @Column("integer", { name: "quantity" })
  quantity: number;

  @ManyToOne(() => Entries, (entries) => entries.entriesItems)
  @JoinColumn([{ name: "entry_id", referencedColumnName: "id" }])
  entry: Entries;

  @ManyToOne(() => Items, (items) => items.entriesItems)
  @JoinColumn([{ name: "item_id", referencedColumnName: "id" }])
  item: Items;
}
