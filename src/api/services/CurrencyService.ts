import type {
  Currency,
  NewCurrency,
} from '../../domain/Currency/Currency.entity';
import { CrudWithoutMapper } from '../crud/CrudWithoutMapper';
import type { Request } from '../request/Request.types';

class CurrencyService extends CrudWithoutMapper<Currency, NewCurrency> {
  constructor(request: Request) {
    super('currencies/', request);
  }
}

export default CurrencyService;
