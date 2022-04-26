import type { LoaderData } from '@tanstack/react-location';
import { useMatch } from '@tanstack/react-location';

import type { ResponseData } from '../../api/types';
import type { Expense } from '../../domain/Expense/Expense.entity';

export function useExpense(): Expense {
  const {
    data: { expense },
  } = useMatch<{ LoaderData: LoaderData<ResponseData<Expense>> }>();

  if (!expense || !expense.data || expense.error) {
    throw new Error('Could not load this expense, please try again');
  }

  return expense.data;
}
