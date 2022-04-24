import type {
  ExpandedExpense,
  Expense,
  NewExpense,
} from '../../domain/Expense/Expense.entity';
import { Crud } from '../crud/Crud';
import type { Mapper } from '../crud/Mapper';

class ExpenseMapper implements Mapper<Expense, ExpandedExpense> {
  serverToEntity(expandedExpense: ExpandedExpense): Expense {
    const { id, note, date, amount, currency, category } = expandedExpense;
    return {
      id,
      note,
      date,
      amount,
      categoryId: category.id,
      currencyId: currency.id,
    };
  }
}

class ExpenseService extends Crud<Expense, NewExpense, ExpandedExpense> {
  constructor() {
    super('expenses/', new ExpenseMapper());
  }
}

export default ExpenseService;
