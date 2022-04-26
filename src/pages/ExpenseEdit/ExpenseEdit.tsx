import type { FC } from 'react';
import { withErrorBoundary } from 'react-error-boundary';

import { ErrorBoundryFallback } from '../../components/ErrorBoundryFallback/ErrorBoundryFallback';
import { useCurrencies } from '../../domain/Currency/Currency.hook';

import { useExpense } from './ExpenseEdit.hook';

namespace ExpenseEdit {
  export interface Props {}
}

const ExpenseEdit: FC<ExpenseEdit.Props> = () => {
  const currencies = useCurrencies();
  const expense = useExpense();

  console.log(expense, currencies);

  return null;
};

const ErrorBoundaryExpenseEdit = withErrorBoundary(ExpenseEdit, {
  FallbackComponent: ErrorBoundryFallback,
});

export { ErrorBoundaryExpenseEdit as ExpenseEdit };
