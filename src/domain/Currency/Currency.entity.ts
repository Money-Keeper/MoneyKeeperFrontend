export interface NewCurrency {
  name: string;
  code: string;
  symbol: string;
}

export interface Currency extends NewCurrency {
  id: string;
}
