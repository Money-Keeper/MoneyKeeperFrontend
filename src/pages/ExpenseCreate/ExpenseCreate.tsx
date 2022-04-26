import styled from 'styled-components';

import { ExpenseCreateForm } from '../../components/ExpenseForm/ExpenseCreateForm';
import { useCurrencies } from '../../domain/Currency/Currency.hook';

const ExpenseCreate = () => {
  const currencies = useCurrencies();

  return (
    <Container>
      <ExpenseCreateForm currencies={currencies} />
    </Container>
  );
};

export default ExpenseCreate;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
