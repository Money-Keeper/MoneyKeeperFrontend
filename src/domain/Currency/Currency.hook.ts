import { useRecoilState } from 'recoil';

import CurrencyService from '../../api/CurrencyService';

import { currenciesList } from './Currency.atom';
import type { Currency } from './Currency.entity';

export const useCurrencies = (): [Currency[], () => Promise<void>] => {
  const [currencies, setCurrencies] = useRecoilState(currenciesList);

  const fetchCurrencies = async () => {
    const data = await CurrencyService.get();
    setCurrencies(data);
  };

  return [currencies, fetchCurrencies];
};
