import { Sale } from "./sales.interface";

export interface Customer {
    id: number;
    name: string;
    personalId: string; // Unique
    phoneNumber: string; // Unique
    residenceLocation: string;
    sales?: Sale[]; // Array of related sales
  }