import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Items } from "./Items";
import { Sales } from "./Sales";

@Index("sales_items_pkey", ["id"], { unique: true })
@Index("fki_item_id_sales_items_fk", ["itemId"], {})
@Index("fki_sale_id_sales_items_fk", ["saleId"], {})
@Entity("sales_items", { schema: "public" })
export class SalesItems {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "item_id" })
  itemId: number;

  @Column("integer", { name: "sale_id" })
  saleId: number;

  @Column("integer", { name: "quantity" })
  quantity: number;

  @ManyToOne(() => Items, (items) => items.salesItems)
  @JoinColumn([{ name: "item_id", referencedColumnName: "id" }])
  item: Items;

  @ManyToOne(() => Sales, (sales) => sales.salesItems)
  @JoinColumn([{ name: "sale_id", referencedColumnName: "id" }])
  sale: Sales;
}
