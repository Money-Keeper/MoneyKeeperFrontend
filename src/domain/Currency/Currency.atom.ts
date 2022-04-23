import { atom } from 'recoil';

import type { Currency } from './Currency.entity';

export const currenciesList = atom<Currency[]>({
  key: 'CurrenciesList',
  default: [],
});
