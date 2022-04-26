import type { FC } from 'react';

import { Api } from '../../api';
import type { Currency } from '../../domain/Currency/Currency.entity';
import type { NewExpense } from '../../domain/Expense/Expense.entity';

import { ExpenseForm } from './components/ExpenseForm';
import { FormWrapper } from './components/FormWrapper';

namespace ExpenseCreateForm {
  export interface Props {
    currencies: Currency[];
  }
}

const ExpenseCreateForm: FC<ExpenseCreateForm.Props> = ({ currencies }) => {
  const onSubmit = (values: NewExpense) => {
    const data: NewExpense = {
      ...values,
      categoryId: 'd5ed66bd-c9f8-4e3a-b85e-fdedc0063da1',
    };
    Api.Expense.post(data);
  };

  return (
    <FormWrapper title="Add Expense">
      <ExpenseForm currencies={currencies} onSubmit={onSubmit} />
    </FormWrapper>
  );
};

export { ExpenseCreateForm };
