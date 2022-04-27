import { atom } from 'recoil';

import { Api } from '../../api';

import type { Currency } from './Currency.entity';

export const currencies = atom<Currency[]>({
  key: 'currencies',
  default: fetchCurrencies(),
});

async function fetchCurrencies() {
  const { data, error } = await Api.Currency.get();

  if (error) {
    throw new Error('Could not get currencies');
  }

  return !data ? [] : data;
}
