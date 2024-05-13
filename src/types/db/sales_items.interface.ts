import { Item } from './items.interface';
import { Sale } from './sales.interface';

export interface SaleItem {
  id: number;
  itemId: number;
  saleId: number;
  quantity: number;
  item?: Item; // Related item
  sale?: Sale; // Related sale
}
