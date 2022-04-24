import type { Currency } from '../domain/Currency/Currency.entity';

import { Request } from './request';

namespace CurrencyService {
  const prefix = 'currencies/';
  const request = new Request(prefix);

  export const get = async (): Promise<Currency[]> => {
    const [data, error] = await request.get<Currency[]>();

    if (error || !data) {
      return [];
    }

    return data;
  };
}

export default CurrencyService;
