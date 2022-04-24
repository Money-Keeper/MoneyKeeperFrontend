import type { NewExpense } from '../domain/Expense/Expense.entity';

import { Request } from './request';

namespace ExpenseService {
  const prefix = 'expenses/';
  const request = new Request(prefix);

  export const post = async (expense: NewExpense) => {
    const [data, error] = await request.post<null, NewExpense>({
      body: expense,
    });
  };
}

export default ExpenseService;
