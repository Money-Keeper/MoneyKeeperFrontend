import type { NewExpense } from '../domain/Expense/Expense.entity';

import turniki, { Method } from './turniki';

namespace ExpenseService {
  export const prefix = 'expenses/';

  export const post = (expense: NewExpense) => {
    const [data, error] = turniki<null, NewExpense>({
      url: ExpenseService.prefix,
      method: Method.post,
      body: expense,
    });
  };
}

export default ExpenseService;
