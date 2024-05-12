import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EntriesItems } from "./EntriesItems";
import { SalesItems } from "./SalesItems";

@Index("articles_pk", ["id"], { unique: true })
@Entity("items", { schema: "public" })
export class Items {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "barcode_id",
    nullable: true,
    length: 12,
  })
  barcodeId: string | null;

  @Column("character varying", { name: "name", length: 70 })
  name: string;

  @Column("numeric", { name: "price", precision: 4, scale: 2 })
  price: string;

  @Column("character varying", { name: "category ", length: 25 })
  category: string;

  @Column("character varying", { name: "manufacturer", length: 70 })
  manufacturer: string;

  @Column("integer", { name: "quantity" })
  quantity: number;

  @OneToMany(() => EntriesItems, (entriesItems) => entriesItems.item)
  entriesItems: EntriesItems[];

  @OneToMany(() => SalesItems, (salesItems) => salesItems.item)
  salesItems: SalesItems[];
}
