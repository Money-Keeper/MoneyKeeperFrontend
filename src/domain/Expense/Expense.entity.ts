export interface NewExpense {
  amount: number;
  date: string;
  categoryId: string;
  currencyId: string;
  note: string;
}

export interface Expense extends NewExpense {
  id: string;
}
