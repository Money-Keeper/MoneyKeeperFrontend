import type { FC } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import styled from 'styled-components';

import { ErrorBoundryFallback } from '../../components/ErrorBoundryFallback/ErrorBoundryFallback';
import { ExpenseEditForm } from '../../components/ExpenseForm/ExpenseEditForm';
import { useCurrencies } from '../../domain/Currency/Currency.hook';
import { Stack } from '../../ui/Stack/Stack';

import { useExpense } from './ExpenseEdit.hook';

namespace ExpenseEdit {
  export interface Props {}
}

const ExpenseEdit: FC<ExpenseEdit.Props> = () => {
  const currencies = useCurrencies();
  const expense = useExpense();

  return (
    <Container direction="horizontal" justify="center">
      <ExpenseEditForm expense={expense} currencies={currencies} />
    </Container>
  );
};

export { ExpenseEdit };

const Container = styled(Stack)`
  padding-top: 40px;
`;
