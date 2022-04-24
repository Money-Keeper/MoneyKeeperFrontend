import type {
  Currency,
  NewCurrency,
} from '../../domain/Currency/Currency.entity';
import { CrudWithoutMapper } from '../crud/CrudWithoutMapper';

class CurrencyService extends CrudWithoutMapper<Currency, NewCurrency> {
  constructor() {
    super('currencies/');
  }
}

export default CurrencyService;
