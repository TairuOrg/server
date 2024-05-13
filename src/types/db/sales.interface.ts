import { Cashier } from './cashier.interface';
import { Customer } from './customers.interface';
import { SaleItem } from './sales_items.interface';

export interface Sale {
  id: number;
  cashierId: number;
  customerId: number;
  date: Date;
  cashier?: Cashier; // Related cashier
  customer?: Customer; // Related customer
  salesItems?: SaleItem[]; // Array of related saleItems
}
