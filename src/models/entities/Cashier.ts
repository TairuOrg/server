import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Sales } from "./Sales";

@Index("unique2", ["email", "personalId", "phoneNumber"], { unique: true })
@Index("cashiers_pkey", ["id"], { unique: true })
@Entity("cashier", { schema: "public" })
export class Cashier {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "personal_id",
    unique: true,
    length: 10,
  })
  personalId: string;

  @Column("character varying", { name: "name", length: 70 })
  name: string;

  @Column("character varying", { name: "password", length: 256 })
  password: string;

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

  @OneToMany(() => Sales, (sales) => sales.cashier)
  sales: Sales[];
}
