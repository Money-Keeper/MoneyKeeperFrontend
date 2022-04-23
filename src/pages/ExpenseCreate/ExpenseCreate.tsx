import { useEffect } from 'react';
import styled from 'styled-components';

import { ExpenseForm } from '../../components/ExpenseForm/ExpenseForm';
import { useCurrencies } from '../../domain/Currency/Currency.hook';

const ExpenseCreate = () => {
  const [, fetchCurrencies] = useCurrencies();

  useEffect(() => {
    fetchCurrencies();
  }, []);

  return (
    <Container>
      <ExpenseForm />
    </Container>
  );
};

export default ExpenseCreate;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
