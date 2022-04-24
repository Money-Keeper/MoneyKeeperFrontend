import { Button, DatePicker, Form, Input, Select } from 'antd';
import styled from 'styled-components';

import ExpenseService from '../../api/services/ExpenseService';
import { useCurrencies } from '../../domain/Currency/Currency.hook';

namespace ExpenseForm {
  export interface Props {
    onSubmit: (...param: any) => void;
    onClose?: () => void;
  }
}

const ExpenseForm = () => {
  const [currencies] = useCurrencies();

  const onFinish = (values: any) => {
    const data = {
      categoryId: 'd5ed66bd-c9f8-4e3a-b85e-fdedc0063da1',
      ...values,
    };
    console.log(data);
    ExpenseService.post(data);
  };

  console.log(currencies);

  return (
    <Container>
      <Title>Add Expense</Title>

      <StyledForm layout="vertical" onFinish={onFinish}>
        <Form.Item label="Amount">
          <Input.Group compact>
            <Form.Item name="currencyId" style={{ width: '20%' }}>
              <Select style={{ width: '100%' }}>
                {currencies.map((currency) => (
                  <Select.Option key={currency.id} value={currency.id}>
                    {`${currency.name} (${currency.symbol})`}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="amount" style={{ width: '80%' }}>
              <Input />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item name="date" label="Date">
          <StyledDatePicker size="large" />
        </Form.Item>

        <Form.Item name="note" label="Note">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item style={{ textAlign: 'center' }}>
          <Button size="large" htmlType="submit" type="primary" shape="round">
            Save
          </Button>
        </Form.Item>
      </StyledForm>
    </Container>
  );
};

export { ExpenseForm };

const StyledForm = styled(Form)`
  width: 100%;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`;

const Container = styled.div`
  min-width: 700px;
  padding: 30px 60px 10px;

  border-radius: 10px;
  background-color: #fff;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 20px;

  margin-bottom: 50px;
`;
