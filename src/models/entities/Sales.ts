import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cashier } from "./Cashier";
import { Customers } from "./Customers";
import { SalesItems } from "./SalesItems";

@Index("fki_cashier_id_sales_fk", ["cashierId"], {})
@Index("fki_customer_id_sales_fk", ["customerId"], {})
@Index("sales_pkey", ["id"], { unique: true })
@Entity("sales", { schema: "public" })
export class Sales {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "cashier_id" })
  cashierId: number;

  @Column("integer", { name: "customer_id" })
  customerId: number;

  @Column("timestamp without time zone", { name: "date" })
  date: Date;

  @ManyToOne(() => Cashier, (cashier) => cashier.sales)
  @JoinColumn([{ name: "cashier_id", referencedColumnName: "id" }])
  cashier: Cashier;

  @ManyToOne(() => Customers, (customers) => customers.sales)
  @JoinColumn([{ name: "customer_id", referencedColumnName: "id" }])
  customer: Customers;

  @OneToMany(() => SalesItems, (salesItems) => salesItems.sale)
  salesItems: SalesItems[];
}
