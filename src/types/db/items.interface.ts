import { EntryItem } from './entries_items.interface';
import { SaleItem } from './sales_items.interface';

export interface Item {
  id: number;
  barcodeId?: string;
  name: string;
  price: number;
  category: string; // Mapped from "category"
  manufacturer: string;
  quantity: number;
  entriesItems?: EntryItem[]; // Array of related entryItems
  salesItems?: SaleItem[]; // Array of related saleItems
}
