import { Administrator } from './administrators.interface';
import { EntryItem } from './entries_items.interface';

export interface Entry {
  id: number;
  adminId: number;
  description: string;
  date: Date;
  administrator?: Administrator; // Related administrator
  entriesItems?: EntryItem[]; // Array of related entryItems
}
