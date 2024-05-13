import { Sale } from "./sales.interface";

export interface Cashier {
  id: number;
  personalId: string;
  name: string;
  password: string;
  phoneNumber: string;
  email: string;
  residenceLocation: string;
  sales?: Sale[]; // Array of related sales
}