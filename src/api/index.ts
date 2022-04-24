import CategoryService from './services/CategoryService';
import CurrencyService from './services/CurrencyService';
import ExpenseService from './services/ExpenseService';

const createApi = () => {
  let currencyService: CurrencyService;
  let expenseService: ExpenseService;
  let categoryService: CategoryService;

  return {
    get Expense(): ExpenseService {
      if (!expenseService) {
        expenseService = new ExpenseService();
      }
      return expenseService;
    },
    get Currency(): CurrencyService {
      if (!currencyService) {
        currencyService = new CurrencyService();
      }
      return currencyService;
    },
    get Category(): CategoryService {
      if (!categoryService) {
        categoryService = new CategoryService();
      }
      return categoryService;
    },
  };
};

const Api = createApi();

export { Api };
