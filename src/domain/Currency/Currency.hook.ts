import { useRecoilValue } from 'recoil';

import { currencies } from './Currency.atom';
import type { Currency } from './Currency.entity';

export const useCurrencies = (): Currency[] => {
  return useRecoilValue(currencies);
};
