import { Administrator } from './administrators.interface';

export interface Report {
  id: number;
  adminId: number;
  type: string;
  reportUrl: string;
  date: Date;
  administrator?: Administrator; // Related administrator
}
