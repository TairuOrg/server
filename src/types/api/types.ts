import { Decimal } from "@prisma/client/runtime/library";

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
}
export type Revenue = {
  VE: { amount: number };
  US: { amount: number };
  EU: { amount: number };
};

export type Item = {
    barcode_id: string,
    name: string,
    price: Decimal,
    category: string,
    manufacturer: string,
    quantity: number
}

export type CashierView = {
  is_online: boolean,
  User: {
    personal_id: string,
    name: string,
    phone_number: string,
    email: string,
    residence_location: string
  }
}

export type ItemsAndCategoriesCount = {
  items: number;
  categories: number;
};

export type SignUpCode = {
  code: string;
}


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
}
