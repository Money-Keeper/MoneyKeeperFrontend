import type {
  Currency,
  NewCurrency,
} from '../../domain/Currency/Currency.entity';
import { CrudWithoutMapper } from '../crud/CrudWithoutMapper';
import { RequestImpl } from '../request/Request.impl';

class CurrencyService extends CrudWithoutMapper<Currency, NewCurrency> {
  constructor() {
    const request = new RequestImpl('currencies/');

    super(request);
  }
}

export default CurrencyService;
