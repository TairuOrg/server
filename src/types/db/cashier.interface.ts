import { Sale } from "./sales.interface";

export interface Cashier {
  id: number;
  personal_id: string;
  name: string;
  password: string;
  phone_number: string;
  email: string;
  residence_location: string;
  sales?: Sale[]; // Array of related sales
}
