import type { Category } from '../Category/Category.entity';
import type { Currency } from '../Currency/Currency.entity';

export interface NewExpense {
  amount: number;
  date: string;
  categoryId: string;
  currencyId: string;
  note?: string;
}

export interface Expense extends NewExpense {
  id: string;
}

export interface ExpandedExpense {
  id: string;
  amount: number;
  date: string;
  category: Category;
  currency: Currency;
  note?: string;
}
