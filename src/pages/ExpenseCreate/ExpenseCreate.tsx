import styled from 'styled-components';

import { ExpenseCreateForm } from '../../components/ExpenseForm/ExpenseCreateForm';
import { useCurrencies } from '../../domain/Currency/Currency.hook';
import { Stack } from '../../ui/Stack/Stack';

const ExpenseCreate = () => {
  const currencies = useCurrencies();

  return (
    <Container direction="horizontal" justify="center">
      <ExpenseCreateForm currencies={currencies} />
    </Container>
  );
};

export default ExpenseCreate;

const Container = styled(Stack)`
  padding-top: 40px;
`;
