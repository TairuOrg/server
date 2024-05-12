import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Sales } from "./Sales";

@Index("customers_pkey", ["id"], { unique: true })
@Index("unique_personal_id", ["personalId"], { unique: true })
@Index("phone_number_unique", ["phoneNumber"], { unique: true })
@Entity("customers", { schema: "public" })
export class Customers {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", length: 70 })
  name: string;

  @Column("character varying", {
    name: "personal_id",
    unique: true,
    length: 10,
  })
  personalId: string;

  @Column("character varying", {
    name: "phone_number",
    unique: true,
    length: 17,
  })
  phoneNumber: string;

  @Column("character varying", { name: "residence_location", length: 50 })
  residenceLocation: string;

  @OneToMany(() => Sales, (sales) => sales.customer)
  sales: Sales[];
}
