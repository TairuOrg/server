import { Entry } from './entries.interface';
import { Item } from './items.interface';

export interface EntryItem {
  id: number;
  entryId: number;
  itemId: number;
  quantity: number;
  entry?: Entry; // Related entry
  item?: Item; // Related item
}
