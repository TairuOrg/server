// This file name could change over time

export type CashierSummary = {
    active_cashiers: number;
    inactive_cashiers: number;
}

export type ExchangeRate = {
    dolar: number;
    euro: number;
}
export type Revenue = {
  VE: { amount: number };
  US: { amount: number };
  EU: { amount: number };
};
export type ServerResponse<T> = {
  error: boolean;
  body: {
    message: string;
    payload: T;
  };
};