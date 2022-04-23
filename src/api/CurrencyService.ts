import type { Currency } from '../domain/Currency/Currency.entity';

import index from './turniki';

namespace CurrencyService {
  export const prefix = 'currencies/';

  export const get = async (): Promise<Currency[]> => {
    const [data, error] = await index<Currency[]>({
      url: CurrencyService.prefix,
    });

    if (error || !data) {
      return [];
    }

    return data;
  };
}

export default CurrencyService;
