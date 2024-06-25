import { Decimal } from '@prisma/client/runtime/library';

// This file name could change over time
export enum RoleOptions {
  ADMIN = 'admin',
  CASHIER = 'cashier',
}

export type CashierSummary = {
  active_cashiers: number;
  inactive_cashiers: number;
};

export type ExchangeRate = {
  dolar: number;
  euro: number;
};

export type ConvertExchange = {
  bs: number;
  euro: number;
};
export type Revenue = {
  VE: { amount: number };
  US: { amount: number };
  EU: { amount: number };
};

export type Item = {
  barcode_id: string;
  name: string;
  price: Decimal;
  category: string;
  manufacturer: string;
  quantity: number;
};

export type UpdateItem = {
  old_barcode_id: string;
  new_barcode_id: string;
  name: string;
  price: Decimal;
  category: string;
  manufacturer: string;
  quantity: number;
};

export type Report = {
  id: number;
  admin_id: number;
  type: string;
  report_url: string;
  date: Date;
};

export type Sale = {
  id: number;
  cashier_id: number;
  customer_id: number;
  date: Date;
  is_completed: boolean;
};

export type Customer = {
  id: number;
  name: string;
  personal_id: string;
  phone_number: string;
  residence_location: string;
};

export type UpdateCustomerData = {
  name: string; //70
  old_personal_id: string; //9
  personal_id: string; //9
  phone_number: string; //10
  residence_location: string; //50
};

export type CustomerId = {
  personal_id: string;
};

export type UserId = {
  personal_id: string;
};

export type CashierView = {
  is_online: boolean;
  User: {
    personal_id: string;
    name: string;
    phone_number: string;
    email: string;
    residence_location: string;
  };
};

export type ItemsAndCategoriesCount = {
  items: number;
  categories: number;
};

export type SignUpCode = {
  code: string;
};

export type ServerResponse<T> = {
  error: boolean;
  body: {
    message: string;
    payload: T;
  };
};

export type SignUpData = {
  personal_id: string;
  password: string;
  name: string;
  phone_number: string;
  email: string;
  residence_location: string;
  role: RoleOptions;
};

export type NotificationData = {
  body_message: string;
  priority_status: string;
  date: Date;
};

export type EntryItem = {
  item_id: number;
  current_quantity: number;
  add_quantity: number;
  name: string;
  category: string;
  price: Decimal;
  manufacturer: string;
};

export type Entry = {
  admin_id: number;
  description: string;
  date: Date;
  entry_items: EntryItem[];
}

export type VerifyCustomer = {
  personal_id: string;
}

export type CustomerData = { 
  name:string
  personal_id:string
  phone_number:string
  residence_location:string
}