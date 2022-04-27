import type { FC } from 'react';

import { Api } from '../../api';
import type { Currency } from '../../domain/Currency/Currency.entity';
import type { Expense, NewExpense } from '../../domain/Expense/Expense.entity';

import { ExpenseForm } from './components/ExpenseForm';
import { FormWrapper } from './components/FormWrapper';

namespace ExpenseEditForm {
  export interface Props {
    expense: Expense;
    currencies: Currency[];
  }
}

const ExpenseEditForm: FC<ExpenseEditForm.Props> = ({
  currencies,
  expense,
}) => {
  const onSubmit = (values: NewExpense) => {
    const data: Expense = {
      ...expense,
      ...values,
      categoryId: 'd5ed66bd-c9f8-4e3a-b85e-fdedc0063da1',
    };
    Api.Expense.put(expense.id, data);
  };

  return (
    <FormWrapper title="Edit Expense">
      <ExpenseForm
        currencies={currencies}
        defaultValues={expense}
        onSubmit={onSubmit}
      />
    </FormWrapper>
  );
};

export { ExpenseEditForm };
